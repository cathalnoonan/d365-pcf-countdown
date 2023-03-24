import { IInputs, IOutputs } from './generated/ManifestTypes'
import countdown from 'countdown'

export class PCFCountdown implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private context: ComponentFramework.Context<IInputs>
    private countdownDiv: HTMLDivElement
    private interval: number | null


    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.context = context
        this.countdownDiv = container.appendChild(document.createElement("div"))
        this.start()
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.context = context
    }
    public getOutputs(): IOutputs {
        return {}
    }
    public destroy(): void {
        if (this.interval === null) {
            return
        }
        window.clearInterval(this.interval)
        this.interval = null
    }

    private start = () => {
        this.loop()
        this.interval = window.setInterval(this.loop, 1000) // Every second
    }

    private loop = () => {
        const text = this.getDisplayText()
        this.countdownDiv.innerText = text
        this.countdownDiv.title = text
    }

    private getDisplayText = () => {
        const then = this.context.parameters.dateTime.raw
        const now = new Date()
        if (then === null) {
            return '---'
        }
        return countdown(then, now).toString()
    }
}
