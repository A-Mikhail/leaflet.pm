const PMButton = DG.Control.extend({
    options: {
        position: 'topleft',
    },
    // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
    initialize(options) {
        this._button = DG.Util.setOptions(this, options);
    },

    onAdd(map) {
        this._map = map;

        this._container = this._map.pm.Toolbar.container;
        this.buttonsDomNode = this._makeButton(this._button);
        this._container.appendChild(this.buttonsDomNode);

        return this._container;
    },

    onRemove() {
        this.buttonsDomNode.remove();

        return this._container;
    },

    getText() {
        return this._button.text;
    },

    getIconUrl() {
        return this._button.iconUrl;
    },

    destroy() {
        this._button = {};
        this._update();
    },

    toggle(e) {
        if(typeof e === 'boolean') {
            this._button.toggleStatus = e;
        } else {
            this._button.toggleStatus = !this._button.toggleStatus;
        }
        this._applyStyleClasses();

        return this._button.toggleStatus;
    },
    toggled() {
        return this._button.toggleStatus;
    },
    onCreate() {
        this.toggle(false);
    },
    _triggerClick(e) {
        this._button.onClick(e);
        this._clicked(e);
        this._button.afterClick(e);
    },
    _makeButton(button) {
        const newButton = DG.DomUtil.create('a', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus) {
            DG.DomUtil.addClass(newButton, 'active');
        }

        const image = DG.DomUtil.create('div', 'control-icon', newButton);
        if (button.iconUrl) {
            image.setAttribute('src', button.iconUrl);
        }
        if (button.className) {
            DG.DomUtil.addClass(image, button.className);
        }
        // before the actual click, trigger a click on currently toggled buttons to
        // untoggle them and their functionality
        DG.DomEvent.addListener(newButton, 'click', () => {
            if(this._button.disableOtherButtons) {
                this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
            }
        });
        DG.DomEvent.addListener(newButton, 'click', this._triggerClick, this);

        DG.DomEvent.disableClickPropagation(newButton);
        return newButton;
    },

    _applyStyleClasses() {
        if(!this._container) {
            return;
        }

        if(!this._button.toggleStatus) {
            DG.DomUtil.removeClass(this.buttonsDomNode, 'active');
        } else {
            DG.DomUtil.addClass(this.buttonsDomNode, 'active');
        }
    },

    _clicked() {
        if(this._button.doToggle) {
            this.toggle();
        }
        return;
    },

});

export default PMButton;
