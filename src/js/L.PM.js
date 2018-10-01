/**
 *
 * A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * by Sumit Kumar (@TweetsOfSumit)
 * Github Repo: https://github.com/codeofsumit/leaflet.pm
 */

import './polyfills';
import { version } from '../../package.json';

import Map from './L.PM.Map';
import Toolbar from './Toolbar/L.PM.Toolbar';

import Draw from './Draw/L.PM.Draw';
import './Draw/L.PM.Draw.Marker';
import './Draw/L.PM.Draw.Line';
import './Draw/L.PM.Draw.Poly';
import './Draw/L.PM.Draw.Rectangle';
import './Draw/L.PM.Draw.Circle';
import './Draw/L.PM.Draw.Cut';

import Edit from './Edit/L.PM.Edit';
import './Edit/L.PM.Edit.LayerGroup';
import './Edit/L.PM.Edit.Marker';
import './Edit/L.PM.Edit.Line';
import './Edit/L.PM.Edit.Poly';
import './Edit/L.PM.Edit.Rectangle';
import './Edit/L.PM.Edit.Circle';

import '../css/layers.css';
import '../css/controls.css';

const DG = require('2gis-maps');

L.PM = L.PM || {
    Map,
    Toolbar,
    Draw,
    Edit,
    version,
    initialize() {
        this.addInitHooks();
    },
    addInitHooks() {
        function initMap() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Map(this);
            }
        }

        DG.Map.addInitHook(initMap);

        function initLayerGroup() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        }

        DG.LayerGroup.addInitHook(initLayerGroup);

        function initMarker() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Marker(this);
            }
        }

        DG.Marker.addInitHook(initMarker);

        function initPolyline() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Line(this);
            }
        }

        DG.Polyline.addInitHook(initPolyline);

        function initPolygon() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Poly(this);
            }
        }

        DG.Polygon.addInitHook(initPolygon);

        function initRectangle() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Rectangle(this);
            }
        }

        DG.Rectangle.addInitHook(initRectangle);

        function initCircle() {
            if (!this.options.pmIgnore) {
                this.pm = new L.PM.Edit.Circle(this);
            }
        }

        DG.Circle.addInitHook(initCircle);
    },
};

// initialize leaflet.pm
L.PM.initialize();
