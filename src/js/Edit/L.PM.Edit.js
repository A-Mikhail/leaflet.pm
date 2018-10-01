import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Drag';

const Edit = DG.Class.extend({
    includes: [DragMixin, SnapMixin],
    options: {
        snappable: true,
        snapDistance: 20,
        allowSelfIntersection: true,
        draggable: true,
    },
    isPolygon() {
        // if it's a polygon, it means the coordinates array is multi dimensional
        return this._layer instanceof DG.Polygon;
    },
});

export default Edit;
