import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as countdown from 'countdown';

export function PCFCountdown(): ComponentFramework.StandardControl<IInputs, IOutputs> {

    let _context: ComponentFramework.Context<IInputs>;
    let _countdownDiv: HTMLDivElement;
    let _interval: number | null;

    function start(): void {
        _interval = window.setInterval(loop, 1000); // Every second
    }

    function loop(): void {
        const text = getDisplayText();
        _countdownDiv.innerText = text;
        _countdownDiv.title = text;
    }

    function getDisplayText(): string {
        const then = _context.parameters.dateTime.raw;
        const now = new Date();
        if (then === null) {
            return "---";
        }
        return countdown(then, now).toString();
    }

    return {
        init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
            _context = context;
            _countdownDiv = container.appendChild(document.createElement("div"));
            start();
        },
        updateView(context: ComponentFramework.Context<IInputs>): void {
            _context = context;
        },
        getOutputs(): IOutputs {
            return {};
        },
        destroy(): void {
            if (_interval === null) {
                return;
            }
            window.clearInterval(_interval);
            _interval = null;
        }
    }
}