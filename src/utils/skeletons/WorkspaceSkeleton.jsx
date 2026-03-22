import useTheme from "../../hooks/useTheme";
import SkeletonCard from "./SkeletonCard";
import { getThemeStyles } from "../../styles/theme";

export default function WorkspaceSkeleton() {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  return (
    <div
      className={`w-full h-full flex flex-wrap justify-center gap-2 p-4 overflow-y-auto lg:overflow-hidden transition-colors duration-300
      ${theme.page}`}
    >
      {Array.from({ length: 4 }).map((item) => (
        <SkeletonCard key={item} />
      ))}
    </div>
  );
}
