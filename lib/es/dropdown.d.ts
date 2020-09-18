export default DropDown;
declare class DropDown {
    static PropTypes: {
        activeInList: any;
        value: any;
        options: any;
    };
    state: {
        open: boolean;
    };
    handleFocus: () => void;
    handleClick: (option: any) => void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    dropdownContainer: any;
    render(): any;
}
