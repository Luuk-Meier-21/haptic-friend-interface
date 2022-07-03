export const nullSafeEvent = <T = void>(
    eventHandler: ((...arg: any) => T), 
    fallback: (() => T) = () => ({} as T)
): T => (
    eventHandler != null ? eventHandler() : fallback()
)