export const nullSafeEvent = <T = void>(
    eventHandler: ((...arg: any) => T), 
    fallback: (() => T) = () => ({} as T)
): T => (
    eventHandler != null ? eventHandler() : fallback()
)

type FN = (...args: any) => void;
export const nullSafeExec = (eventHandler: FN, ...args: any): FN => {
    return () => {
        eventHandler(...args);
    }
}