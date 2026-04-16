export default interface MenuInfo {
    menuId: string;
    title: string;
    path: string;
    icon: string;
    children: MenuInfo[];
}
