import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import { ControllerShapeDrawer } from "./ControllerShapeDrawer";
import { ControllerLabelDrawer } from "./ControllerLabelDrawer";
import { BUMPER_LABELS, FACE_BUTTON_LABELS, TRIGGER_LABELS, STICK_LABEL } from "./ControllerLabelData";

export class ControllerDiagramDrawer {
    static draw(api: IScreenRenderAPI, cx: number, cy: number): void {
        ControllerShapeDrawer.drawBody(api, cx, cy);
        ControllerShapeDrawer.drawTriggers(api, cx, cy);
        ControllerShapeDrawer.drawBumpers(api, cx, cy);
        ControllerShapeDrawer.drawStick(api, cx, cy, STICK_LABEL.offset.x, STICK_LABEL.offset.y);
        ControllerShapeDrawer.drawFaceButtons(api, cx, cy, FACE_BUTTON_LABELS);

        const allButtonLabels = [...BUMPER_LABELS, ...FACE_BUTTON_LABELS];
        ControllerLabelDrawer.drawLabels(api, cx, cy, allButtonLabels);
        ControllerLabelDrawer.drawTriggerLabels(api, cx, cy, TRIGGER_LABELS);
        ControllerLabelDrawer.drawStickLabel(api, cx, cy, STICK_LABEL);
    }
}
