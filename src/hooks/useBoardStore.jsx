import { createTLStore, defaultShapeUtils, computed, InstancePresenceRecordType, react, createPresenceStateDerivation, defaultUserPreferences, getUserPreferences, setUserPreferences, transact } from '@tldraw/tldraw'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import * as Y from 'yjs'
import { YKeyValue } from 'y-utility/y-keyvalue'
import { SocketIOProvider } from 'y-socket.io'
import { DEFAULT_STORE } from '../utils/default_store';


const useBoardStore = ({ roomID, userName }) => {
  const server = import.meta.env.VITE_BOARD_ENDPOINT

  const [store] = useState(() => {
    const newStore = createTLStore({
      shapeUtils: defaultShapeUtils,
    })
    newStore.loadSnapshot(DEFAULT_STORE)
    return newStore
  })

  const [storeWithStatus, setStoreWithStatus] = useState({
    store:store,
    status: 'loading',
    connectionStatus : ''
})

  const { yDoc, yStore, room } = useMemo(() => {
    const yDoc = new Y.Doc({ gc: true })
    const yArr = yDoc.getArray(`tl_${roomID}`)
    const yStore = new YKeyValue(yArr)

    return {
      yDoc,
      yStore,
      room: new SocketIOProvider(server, roomID, yDoc, { autoConnect: true })
    }
  }, [server, roomID])

  useEffect(() => {
    room.connect()

    setStoreWithStatus({ 
      store:store,
      status: 'loading',
      connectionStatus : ''
     })

    const unsubs = []

    function handleSync() {

      unsubs.push(
        store.listen(
          function syncStoreChangesToYjsDoc({ changes }) {
            yDoc.transact(() => {
              Object.values(changes.added).forEach((record) => {

                yStore.set(record.id, record)
              })

              Object.values(changes.updated).forEach(([, record]) => {

                yStore.set(record.id, record)
              })

              Object.values(changes.removed).forEach((record) => {
                yStore.delete(record.id)
              })
            })
          },
          { source: 'user', scope: 'document' }
        )
      )

      const handleChange = (
        changes,
        transaction
      ) => {
        if (transaction.local) return

        const toRemove = []
        const toPut = []

        changes.forEach((change, id) => {

          switch (change.action) {
            case 'add':
            case 'update': {
              const record = yStore.get(id)
              toPut.push(record)
              break
            }
            case 'delete': {
              toRemove.push(id)
              break
            }
          }
        })

        store.mergeRemoteChanges(() => {
          if (toRemove.length) store.remove(toRemove)
          if (toPut.length) store.put(toPut)
        })
      }

      yStore.on('change', handleChange)
      unsubs.push(() => yStore.off('change', handleChange))

      const yClientId = room.awareness.clientID.toString()
      setUserPreferences({ id: yClientId })

      const userPreferences = computed('userPreferences', () => {
        const user = getUserPreferences()
        return {
          id: user.id,
          color: defaultUserPreferences.color,
          name: userName,
        }
      })

      const presenceId = InstancePresenceRecordType.createId(yClientId)
      const presenceDerivation = createPresenceStateDerivation(userPreferences, presenceId)(store)
      console.log(presenceDerivation.get())

      room.awareness.setLocalStateField('presence', presenceDerivation.get())

      unsubs.push(
        react('when presence changes', () => {
          const presence = presenceDerivation.get()
          requestAnimationFrame(() => {
            room.awareness.setLocalStateField('presence', presence)
          })
        })
      )

      const handleUpdate = (update) => {
        const states = room.awareness.getStates()

        const toRemove = []
        const toPut = []

        for (const clientId of update.added) {
          const state = states.get(clientId)
          if (state?.presence && state.presence.id !== presenceId) {
            toPut.push(state.presence)
          }
        }

        for (const clientId of update.updated) {
          const state = states.get(clientId)
          if (state?.presence && state.presence.id !== presenceId) {
            toPut.push(state.presence)
          }
        }

        for (const clientId of update.removed) {
          toRemove.push(
            InstancePresenceRecordType.createId(clientId.toString())
          )
        }

        store.mergeRemoteChanges(() => {
          if (toRemove.length) store.remove(toRemove)
          if (toPut.length) store.put(toPut)
        })
      }

      room.awareness.on('update', handleUpdate)
      unsubs.push(() => room.awareness.off('update', handleUpdate))

      if (yStore.yarray.length) {
        transact(() => {
          store.clear()
          const records = yStore.yarray.toJSON().map(({ val }) => val)
          store.put(records)
        })
      } else {
        yDoc.transact(() => {
          for (const record of store.allRecords()) {
            yStore.set(record.id, record)
          }
        })
      }
      setStoreWithStatus({
        store,
        status: 'synced-remote',
        connectionStatus: 'online',
      })

    }
    let hasConnectedBefore = false

		function handleStatusChange({
			status,
		}) {
			if (status === 'disconnected') {
				setStoreWithStatus({
					store,
					status: 'synced-remote',
					connectionStatus: 'offline',
				})
				return
			}

			room.off('synced', handleSync)

			if (status === 'connected') {
				if (hasConnectedBefore) return
				hasConnectedBefore = true
				room.on('synced', handleSync)
				unsubs.push(() => room.off('synced', handleSync))
			}
		}

		room.on('status', handleStatusChange)
		unsubs.push(() => room.off('status', handleStatusChange))

    return () => {
      unsubs.forEach((fn) => fn())
      unsubs.length = 0
      room.disconnect()
    }
  }, [room, yDoc, store, yStore,userName])


  return storeWithStatus
}


useBoardStore.propTypes = {
  roomID: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
}

export default useBoardStore