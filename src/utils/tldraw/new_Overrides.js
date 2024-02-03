import { findMenuItem } from "@tldraw/tldraw"

const myOverrides = {
    menu(editor,menu){

        const preferencesActions = findMenuItem(menu,['preferences','preferences','preferences-actions'])
        if(preferencesActions.children.length >7){
          preferencesActions.children.pop()
          preferencesActions.children = preferencesActions.children.filter((preference)=> preference.id !== 'toggle-dark-mode')
        }
        return menu
      },
  
      actions(editor, actions){
        actions['toggle-dark-mode'].kbd = ""
        return actions
      },
  
      keyboardShortcutsMenu(_editor, shortcutsMenu){
        const shortcuts = findMenuItem(shortcutsMenu,['shortcuts-dialog.preferences'])
        if(shortcuts.children.length > 2){
          shortcuts.children.shift()
        }
        return shortcutsMenu
      }
}

export {myOverrides}