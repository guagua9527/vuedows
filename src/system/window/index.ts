/**
 * 窗口状态枚举
 */
 enum WindowState {
    Minimum,
    Normal,
    Maximum
}

interface IWindowContext<T> {
    context: T
}

type RenderFunction = () => JSX.Element;
type OnActiveChangeFunction = (active: boolean) => void;
type OnWindowStateChangeFunction = (oldState: WindowState, newState: WindowState) => void;
type OnWindowCloseFunction = <T = any>(ctx: IWindowContext<T>) => void;

/**
 * 窗口接口
 */
interface IWindow<T = any> {

    id: number
    // 窗口标题
    title: string
    // 是否为激活窗口
    isActive: boolean
    // 窗口状态
    state: WindowState
    context: IWindowContext<T>
    
    // ----- Render -----

    // 整体 render
    render: RenderFunction

    // 顶部栏 render
    headerRender: RenderFunction
    // 内容 render
    contentRender: RenderFunction

    // ----- callback function -----
    onActiceChange: OnActiveChangeFunction
    onWindowStateChange: OnWindowStateChangeFunction
    onWindowClose: OnWindowCloseFunction
}