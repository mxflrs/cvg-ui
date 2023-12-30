export interface menu {
  label: string;
  link: string;
}

export interface menuinterface extends menu {
  submenu?: menu
}
