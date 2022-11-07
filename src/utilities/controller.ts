type Constructor<T> = { new (): T }
export class UtilityController {
    public setup = (setupFn: (controller: this) => void) => {
        setupFn(this);
        return this;
    }
}