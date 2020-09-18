export default class ResponsiveTabPills {
    static propTypes: {
        id: any;
        allowClose: any;
        onClose: any;
        allowReorder: any;
        navRenderer: any;
        className: any;
        activeKey: any;
        list: any;
        onSelect: any;
        height: any;
    };
    static defaultProps: {
        id: string;
        className: string;
        onSelect: () => void;
        onClose: () => void;
        allowClose: boolean;
        allowReorder: boolean;
        height: number;
    };
    constructor(props: any);
    itemWidths: any[];
    state: {
        dragFrom: any;
        dragTo: any;
        isSelectVisible: boolean;
        lastVisibleItemIndex: number;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillUnmount(): void;
    getLastVisibleItemIndex: () => number;
    handleResize: () => any;
    refreshLastVisibleItem: () => void;
    handleOnClick: (id: any, index: any) => void;
    handleClose: (event: any, id: any, index: any) => void;
    dragStart: (index: any) => void;
    dragEnter: (index: any, e: any) => void;
    dragLeave: (index: any, e: any) => void;
    dragDrop: () => void;
    navbarItem: (item: any, index: any, className: any, isDumb: any) => any;
    doLineCount: () => any;
    activeItemIndex: (activeItem: any) => any;
    combobox: () => any;
    selectContainerRef: any;
    render(): any;
    navbarContainerRef: any;
}
