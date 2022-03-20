namespace Process {


    enum SystemMessageType {
        SHUTDOWN,
        CUSTOM,
    }

    interface ISystemMessage {
        type: SystemMessageType,
        content: Record<string, any>
    }

    type OnSystemMessage = (msg: ISystemMessage) => void;

    type OnProcessStartFunction = () => void;
    type OnProcessDisposeFunction = () => void;

    export abstract class Process {
        private id: number

        abstract onProcessStart: OnProcessStartFunction
        abstract onProcessDispose: OnProcessDisposeFunction
        abstract onSystemMessage: OnSystemMessage

        constructor(){
            this.id = Process.generateProcessId();
            Process.processMap.set(this.id, this);

            this.init();
        }

        /**
         * 进程初始化
         */
        private init(){
            this.onProcessStart();
        }

        /**
         * 关闭进程方法
         */
        public dispose(){
            Process.processMap.delete(this.id);
            this.onProcessDispose();
        }

        // ------------- static ---------------
        private static processMap: Map<number, Process> = new Map();

        private static processIndex: number = 0;

        private static generateProcessId(): number {
            return ++this.processIndex;
        }
    }
}