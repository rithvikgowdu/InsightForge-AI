import {
  FiSearch,
  FiHome,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

type IconName =
  | "search"
  | "dashboard"
  | "analysis"
  | "settings";

type Props = {
  name: IconName;
};

function Icon({ name }: Props) {
  const icons = {
    search: <FiSearch />,
    dashboard: <FiHome />,
    analysis: <FiBarChart2 />,
    settings: <FiSettings />,
  };

  return icons[name];
}

export default Icon;