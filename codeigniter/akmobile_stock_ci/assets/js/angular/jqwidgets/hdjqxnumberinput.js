!function(a) {
    a.jqx.jqxWidget("jqxNumberInput", "", {});
    a.extend(a.jqx._jqxNumberInput.prototype, {
        defineInstance: function() {
            var b = {
                value: null,
                decimal: 0,
                min: -99999999,
                max: 99999999,
                width: 200,
                validationMessage: "Invalid value",
                height: 25,
                textAlign: "right",
                readOnly: false,
                promptChar: "_",
                decimalDigits: 2,
                decimalSeparator: ".",
                groupSeparator: ",",
                groupSize: 3,
                symbol: "",
                symbolPosition: "left",
                digits: 8,
                negative: false,
                negativeSymbol: "-",
                disabled: false,
                inputMode: "advanced",
                spinButtons: false,
                spinButtonsWidth: 18,
                spinButtonsStep: 1,
                autoValidate: true,
                spinMode: "advanced",
                enableMouseWheel: true,
                touchMode: "auto",
                allowNull: true,
                placeHolder: "",
                changeType: null,
                rtl: false,
                events: [ "valueChanged", "textchanged", "mousedown", "mouseup", "keydown", "keyup", "keypress", "change" ],
                aria: {
                    "aria-valuenow": {
                        name: "decimal",
                        type: "number"
                    },
                    "aria-valuemin": {
                        name: "min",
                        type: "number"
                    },
                    "aria-valuemax": {
                        name: "max",
                        type: "number"
                    },
                    "aria-disabled": {
                        name: "disabled",
                        type: "boolean"
                    }
                },
                invalidArgumentExceptions: [ "invalid argument exception" ]
            };
            a.extend(true, this, b);
            return b;
        },
        createInstance: function(a) {
            var b = this.host.attr("value");
            if (void 0 != b) this.decimal = b;
            if (null != this.value) this.decimal = this.value;
            this.render();
        },
        _doTouchHandling: function() {
            var a = this;
            var b = a.savedValue;
            if (!a.parsing) a.parsing = true;
            if (a.parsing) {
                if (a.numberInput.val() && 0 == a.numberInput.val().indexOf("-")) a.setvalue("negative", true); else a.setvalue("negative", false);
                var c = a.numberInput.val();
                for (var d = 0; d < c.length - 1; d++) {
                    var e = c.substring(d, d + 1);
                    if (isNaN(parseFloat(e)) && e != a.symbol && "%" != e && "$" != e && "." != e && "," != e && "-" != e) {
                        a.numberInput[0].value = b;
                        a.parsing = false;
                        return;
                    }
                }
                a.ValueString = a.GetValueString(a.numberInput.val(), a.decimalSeparator, "" != a.decimalSeparator);
                a.ValueString = new Number(a.ValueString).toFixed(a.decimalDigits);
                a._parseDecimalInSimpleMode();
                a.decimal = a.ValueString;
                var f = a.getvalue("negative");
                if (f) a.decimal = "-" + a.ValueString;
                a.parsing = false;
            }
        },
        render: function() {
            this.host.attr({
                role: "spinbutton"
            });
            this.host.attr("data-role", "input");
            a.jqx.aria(this);
            a.jqx.aria(this, "aria-multiline", false);
            var b = this;
            if (this.officeMode || this.theme && this.theme.indexOf("office") != -1) if (18 == this.spinButtonsWidth) this.spinButtonsWidth = 15;
            if (a.jqx.mobile.isTouchDevice() || true === this.touchMode) {
                this.inputMode = "textbox";
                this.spinMode = "simple";
            }
            if ("" == this.decimalSeparator) this.decimalSeparator = " ";
            this.host.addClass(this.toThemeProperty("jqx-input"));
            this.host.addClass(this.toThemeProperty("jqx-rc-all"));
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-widget-content"));
            this.host.addClass(this.toThemeProperty("jqx-numberinput"));
            if (this.spinButtons) this._spinButtons(); else {
                this.numberInput = a("<input autocomplete='off' type='textarea'/>").appendTo(this.host);
                this.numberInput.addClass(this.toThemeProperty("jqx-input-content"));
                this.numberInput.addClass(this.toThemeProperty("jqx-widget-content"));
            }
            this.numberInput.attr("placeholder", this.placeHolder);
            var c = this.host.attr("name");
            if (c) this.numberInput.attr("name", c);
            if (this.host.attr("tabindex")) {
                this.numberInput.attr("tabindex", this.host.attr("tabindex"));
                this.host.removeAttr("tabindex");
            }
            if (a.jqx.mobile.isTouchDevice() || true === this.touchMode || "textbox" == this.inputMode) {
                var b = this;
                b.savedValue = "";
                this.addHandler(this.numberInput, "focus", function() {
                    b.savedValue = b.numberInput[0].value;
                });
                this.addHandler(this.numberInput, "change", function() {
                    b._doTouchHandling();
                });
            }
            var d = a.data(this.host[0], "jqxNumberInput");
            d.jqxNumberInput = this;
            var b = this;
            if (this.host.parents("form").length > 0) this.addHandler(this.host.parents("form"), "reset", function() {
                setTimeout(function() {
                    b.setDecimal(0);
                }, 10);
            });
            this.propertyChangeMap.disabled = function(a, b, c, d) {
                if (d) {
                    a.numberInput.addClass(g.toThemeProperty("jqx-input-disabled"));
                    a.numberInput.attr("disabled", true);
                } else {
                    a.host.removeClass(g.toThemeProperty("jqx-input-disabled"));
                    a.numberInput.attr("disabled", false);
                }
                if (a.spinButtons && a.host.jqxRepeatButton) {
                    a.upbutton.jqxRepeatButton({
                        disabled: d
                    });
                    a.downbutton.jqxRepeatButton({
                        disabled: d
                    });
                }
            };
            if (this.disabled) {
                this.numberInput.addClass(this.toThemeProperty("jqx-input-disabled"));
                this.numberInput.attr("disabled", true);
                this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
            }
            this.selectedText = "";
            this.decimalSeparatorPosition = -1;
            var e = this.element.id;
            var f = this.element;
            var g = this;
            this.oldValue = this._value();
            this.items = new Array();
            var h = this.value;
            var i = this.decimal;
            this._initializeLiterals();
            this._render();
            this.setDecimal(i);
            var b = this;
            setTimeout(function() {}, 100);
            this._addHandlers();
            a.jqx.utilities.resize(this.host, function() {
                b._render();
            });
        },
        refresh: function(a) {
            if (!a) this._render();
        },
        wheel: function(a, b) {
            if (!b.enableMouseWheel) return;
            b.changeType = "mouse";
            var c = 0;
            if (!a) a = window.event;
            if (a.originalEvent && a.originalEvent.wheelDelta) a.wheelDelta = a.originalEvent.wheelDelta;
            if (a.wheelDelta) c = a.wheelDelta / 120; else if (a.detail) c = -a.detail / 3;
            if (c) {
                var d = b._handleDelta(c);
                if (a.preventDefault) a.preventDefault();
                if (null != a.originalEvent) a.originalEvent.mouseHandled = true;
                if (void 0 != a.stopPropagation) a.stopPropagation();
                if (d) {
                    d = false;
                    a.returnValue = d;
                    return d;
                } else return false;
            }
            if (a.preventDefault) a.preventDefault();
            a.returnValue = false;
        },
        _handleDelta: function(a) {
            if (a < 0) this.spinDown(); else this.spinUp();
            return true;
        },
        _addHandlers: function() {
            var b = this;
            this.addHandler(this.numberInput, "paste", function(c) {
                var d = b._selection();
                c.preventDefault();
                if (c.originalEvent.clipboardData) content = (c.originalEvent || c).clipboardData.getData("text/plain"); else if (window.clipboardData) content = window.clipboardData.getData("Text");
                this.selectedText = content;
                a.data(document.body, "jqxSelection", this.selectedText);
                if ("simple" != b.inputMode) b._pasteSelectedText(); else b.val(content);
                setTimeout(function() {
                    b._setSelectionStart(d.start);
                });
            });
            this.addHandler(this.numberInput, "mousedown", function(a) {
                return b._raiseEvent(2, a);
            });
            this._mousewheelfunc = this._mousewheelfunc || function(a) {
                if (!b.editcell) {
                    b.wheel(a, b);
                    return false;
                }
            };
            this.removeHandler(this.host, "mousewheel", this._mousewheelfunc);
            this.addHandler(this.host, "mousewheel", this._mousewheelfunc);
            var c = "";
            this.addHandler(this.numberInput, "focus", function(d) {
                a.data(b.numberInput, "selectionstart", b._selection().start);
                b.host.addClass(b.toThemeProperty("jqx-fill-state-focus"));
                if (b.spincontainer) b.spincontainer.addClass(b.toThemeProperty("jqx-numberinput-focus"));
                c = b.numberInput.val();
            });
            this.addHandler(this.numberInput, "blur", function(d) {
                if ("simple" == b.inputMode) b._exitSimpleInputMode(d, b, false, c);
                if (b.autoValidate) {
                    var e = parseFloat(b.decimal);
                    var f = b.getvalue("negative");
                    if (f && b.decimal > 0) e = -parseFloat(b.decimal);
                    if (e > b.max) {
                        b._disableSetSelection = true;
                        b.setDecimal(b.max);
                        b._disableSetSelection = false;
                    }
                    if (e < b.min) {
                        b._disableSetSelection = true;
                        b.setDecimal(b.min);
                        b._disableSetSelection = false;
                    }
                }
                b.host.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
                if (b.spincontainer) b.spincontainer.removeClass(b.toThemeProperty("jqx-numberinput-focus"));
                if (b.numberInput.val() != c) {
                    b._raiseEvent(7, d);
                    a.jqx.aria(b, "aria-valuenow", b.decimal);
                    b.element.value = b.decimal;
                }
                return true;
            });
            this.addHandler(this.numberInput, "mouseup", function(a) {
                return b._raiseEvent(3, a);
            });
            this.addHandler(this.numberInput, "keydown", function(a) {
                b.changeType = "keyboard";
                return b._raiseEvent(4, a);
            });
            this.addHandler(this.numberInput, "keyup", function(a) {
                return b._raiseEvent(5, a);
            });
            this.addHandler(this.numberInput, "keypress", function(a) {
                return b._raiseEvent(6, a);
            });
        },
        focus: function() {
            try {
                this.numberInput.focus();
            } catch (a) {}
        },
        _removeHandlers: function() {
            var b = this;
            this.removeHandler(this.numberInput, "mousedown");
            var c = a.jqx.mobile.isOperaMiniMobileBrowser();
            if (c) this.removeHandler(a(document), "click." + this.element.id, b._exitSimpleInputMode, b);
            this.removeHandler(this.numberInput, "paste");
            this.removeHandler(this.numberInput, "focus");
            this.removeHandler(this.numberInput, "blur");
            this.removeHandler(this.numberInput, "mouseup");
            this.removeHandler(this.numberInput, "keydown");
            this.removeHandler(this.numberInput, "keyup");
            this.removeHandler(this.numberInput, "keypress");
        },
        _spinButtons: function() {
            if (this.host.jqxRepeatButton) {
                if (!this.numberInput) {
                    this.numberInput = a("<input autocomplete='off' style='position: relative; float: left;' type='textarea'/>");
                    this.numberInput.appendTo(this.host);
                    this.numberInput.addClass(this.toThemeProperty("jqx-input-content"));
                    this.numberInput.addClass(this.toThemeProperty("jqx-widget-content"));
                } else this.numberInput.css("float", "left");
                if (this.spincontainer) {
                    if (this.upbutton) this.upbutton.jqxRepeatButton("destroy");
                    if (this.downbutton) this.downbutton.jqxRepeatButton("destroy");
                    this.spincontainer.remove();
                }
                this.spincontainer = a('<div style="float: right; height: 100%; overflow: hidden; position: relative;"></div>');
                if (this.rtl) {
                    this.spincontainer.css("float", "right");
                    this.numberInput.css("float", "right");
                    this.spincontainer.css("left", "-1px");
                }
                this.host.append(this.spincontainer);
                this.upbutton = a('<div style="overflow: hidden; padding: 0px; margin-left: -1px; position: relative;"><div></div></div>');
                this.spincontainer.append(this.upbutton);
                this.upbutton.jqxRepeatButton({
                    overrideTheme: true,
                    disabled: this.disabled,
                    roundedCorners: "top-right"
                });
                this.downbutton = a('<div style="overflow: hidden; padding: 0px; margin-left: -1px; position: relative;"><div></div></div>');
                this.spincontainer.append(this.downbutton);
                this.downbutton.jqxRepeatButton({
                    overrideTheme: true,
                    disabled: this.disabled,
                    roundedCorners: "bottom-right"
                });
                var b = this;
                this.downbutton.addClass(this.toThemeProperty("jqx-fill-state-normal"));
                this.upbutton.addClass(this.toThemeProperty("jqx-fill-state-normal"));
                this.upbutton.addClass(this.toThemeProperty("jqx-rc-tr"));
                this.downbutton.addClass(this.toThemeProperty("jqx-rc-br"));
                this.addHandler(this.downbutton, "mouseup", function(a) {
                    if (!b.disabled) {
                        b.downbutton.removeClass(b.toThemeProperty("jqx-fill-state-pressed"));
                        b._downArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-down-selected"));
                    }
                });
                this.addHandler(this.upbutton, "mouseup", function(a) {
                    if (!b.disabled) {
                        b.upbutton.removeClass(b.toThemeProperty("jqx-fill-state-pressed"));
                        b._upArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-up-selected"));
                    }
                });
                this.removeHandler(a(document), "mouseup." + this.element.id);
                this.addHandler(a(document), "mouseup." + this.element.id, function(a) {
                    b.upbutton.removeClass(b.toThemeProperty("jqx-fill-state-pressed"));
                    b._upArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-up-selected"));
                    b.downbutton.removeClass(b.toThemeProperty("jqx-fill-state-pressed"));
                    b._downArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-down-selected"));
                });
                this.addHandler(this.downbutton, "mousedown", function(c) {
                    if (!b.disabled) {
                        if (a.jqx.browser.msie && a.jqx.browser.version < 9) b._inputSelection = b._selection();
                        b.downbutton.addClass(b.toThemeProperty("jqx-fill-state-pressed"));
                        b._downArrow.addClass(b.toThemeProperty("jqx-icon-arrow-down-selected"));
                        c.preventDefault();
                        c.stopPropagation();
                        return false;
                    }
                });
                this.addHandler(this.upbutton, "mousedown", function(c) {
                    if (!b.disabled) {
                        if (a.jqx.browser.msie && a.jqx.browser.version < 9) b._inputSelection = b._selection();
                        b.upbutton.addClass(b.toThemeProperty("jqx-fill-state-pressed"));
                        b._upArrow.addClass(b.toThemeProperty("jqx-icon-arrow-up-selected"));
                        c.preventDefault();
                        c.stopPropagation();
                        return false;
                    }
                });
                this.addHandler(this.upbutton, "mouseenter", function(a) {
                    b.upbutton.addClass(b.toThemeProperty("jqx-fill-state-hover"));
                    b._upArrow.addClass(b.toThemeProperty("jqx-icon-arrow-up-hover"));
                });
                this.addHandler(this.upbutton, "mouseleave", function(a) {
                    b.upbutton.removeClass(b.toThemeProperty("jqx-fill-state-hover"));
                    b._upArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-up-hover"));
                });
                this.addHandler(this.downbutton, "mouseenter", function(a) {
                    b.downbutton.addClass(b.toThemeProperty("jqx-fill-state-hover"));
                    b._downArrow.addClass(b.toThemeProperty("jqx-icon-arrow-down-hover"));
                });
                this.addHandler(this.downbutton, "mouseleave", function(a) {
                    b.downbutton.removeClass(b.toThemeProperty("jqx-fill-state-hover"));
                    b._downArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-down-hover"));
                });
                this.upbutton.css("border-width", "0px");
                this.downbutton.css("border-width", "0px");
                if (this.disabled) {
                    this.upbutton[0].disabled = true;
                    this.downbutton[0].disabled = true;
                } else {
                    this.upbutton[0].disabled = false;
                    this.downbutton[0].disabled = false;
                }
                this.spincontainer.addClass(this.toThemeProperty("jqx-input"));
                this.spincontainer.addClass(this.toThemeProperty("jqx-rc-r"));
                this.spincontainer.css("border-width", "0px");
                if (!this.rtl) this.spincontainer.css("border-left-width", "1px"); else this.spincontainer.css("border-right-width", "1px");
                this._upArrow = this.upbutton.find("div");
                this._downArrow = this.downbutton.find("div");
                this._upArrow.addClass(this.toThemeProperty("jqx-icon-arrow-up"));
                this._downArrow.addClass(this.toThemeProperty("jqx-icon-arrow-down"));
                this._upArrow.addClass(this.toThemeProperty("jqx-input-icon"));
                this._downArrow.addClass(this.toThemeProperty("jqx-input-icon"));
                var b = this;
                this._upArrow.hover(function() {
                    if (!b.disabled) b._upArrow.addClass(b.toThemeProperty("jqx-icon-arrow-up-hover"));
                }, function() {
                    b._upArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-up-hover"));
                });
                this._downArrow.hover(function() {
                    if (!b.disabled) b._downArrow.addClass(b.toThemeProperty("jqx-icon-arrow-down-hover"));
                }, function() {
                    b._downArrow.removeClass(b.toThemeProperty("jqx-icon-arrow-down-hover"));
                });
                var c = a.jqx.mobile.isTouchDevice();
                var d = "click";
                if (c) d = a.jqx.mobile.getTouchEventName("touchstart");
                if (c) {
                    this.addHandler(this.downbutton, "click", function(a) {
                        b.spinDown();
                    });
                    this.addHandler(this.upbutton, "click", function(a) {
                        b.spinUp();
                    });
                }
                this.addHandler(this.downbutton, d, function(d) {
                    if (!c) {
                        if (0 == b._selection().start) b._setSelectionStart(b.numberInput.val().length);
                        if (a.jqx.browser.msie && a.jqx.browser.version < 9) b._setSelectionStart(b._inputSelection.start);
                    } else {
                        d.preventDefault();
                        d.stopPropagation();
                    }
                    b.spinDown();
                    return false;
                });
                this.addHandler(this.upbutton, d, function(d) {
                    if (!c) {
                        if (0 == b._selection().start) b._setSelectionStart(b.numberInput.val().length);
                        if (a.jqx.browser.msie && a.jqx.browser.version < 9) b._setSelectionStart(b._inputSelection.start);
                    } else {
                        d.preventDefault();
                        d.stopPropagation();
                    }
                    b.spinUp();
                    return false;
                });
            } else throw new Error("jqxNumberInput: Missing reference to jqxbuttons.js.");
        },
        spinDown: function() {
            var b = this;
            var c = this.decimal;
            if ("none" == b.spinMode) return;
            if (null == this.decimal) {
                this.setDecimal(0);
                return;
            }
            var d = this.getvalue("negative");
            var e = d ? -1 : 0;
            if (a.jqx.mobile.isTouchDevice() || "textbox" == this.inputMode) b._doTouchHandling();
            if (!b.disabled) {
                var f = this._selection();
                var g = this.decimal;
                var h = this.getDecimal();
                if (h < this.min) {
                    h = this.min;
                    this.setDecimal(this.min);
                    this._setSelectionStart(f.start);
                    this.spinDown();
                    return;
                } else if (h > this.max) {
                    h = this.max;
                    this.setDecimal(this.max);
                    this._setSelectionStart(f.start);
                    this.spinDown();
                    return;
                }
                if (b.spinButtonsStep < 0) b.spinButtonsStep = 1;
                var i = parseInt(b.decimal) - b.spinButtonsStep;
                i = i.toString().length;
                var j = e + i <= b.digits;
                if ("advanced" != b.spinMode) {
                    if (h - b.spinButtonsStep >= b.min && j) {
                        var k = 1;
                        for (q = 0; q < b.decimalDigits; q++) k = 10 * k;
                        var l = k * h - k * b.spinButtonsStep;
                        l /= k;
                        l = this._parseDecimalValueToEditorValue(l);
                        b.setDecimal(l);
                    }
                } else {
                    var m = this._getspindecimal();
                    var n = this._getSeparatorPosition();
                    var h = parseFloat(m.decimal);
                    if (b.spinButtonsStep < 0) b.spinButtonsStep = 1;
                    var i = parseInt(h) - b.spinButtonsStep;
                    i = i.toString().length;
                    var j = e + i <= b.digits;
                    var k = 1;
                    var o = m.decimal.indexOf(".");
                    if (o != -1) {
                        var p = m.decimal.length - o - 1;
                        var k = 1;
                        for (var q = 0; q < p; q++) k = 10 * k;
                        h -= new Number(b.spinButtonsStep / k);
                        h = h.toFixed(p);
                        var o = h.toString().indexOf(".");
                        if (o == -1) h = h.toString() + ".";
                        var r = h.toString() + m.afterdecimal;
                        r = new Number(r);
                        r = r.toFixed(b.decimalDigits);
                        if (r >= b.min) {
                            r = this._parseDecimalValueToEditorValue(r);
                            b.setDecimal(r);
                        }
                    } else if (h - b.spinButtonsStep >= b.min && j) {
                        var l = k * h - k * b.spinButtonsStep;
                        l /= k;
                        var r = l.toString() + m.afterdecimal;
                        if (r >= b.min) {
                            r = this._parseDecimalValueToEditorValue(r);
                            b.setDecimal(r);
                        }
                    }
                }
                if (void 0 == r || "simple" != this.inputMode) {
                    this._setSelectionStart(f.start);
                    b.savedValue = b.numberInput[0].value;
                    if (c != this.decimal) {
                        if (a.jqx.mobile.isTouchDevice()) this._raiseEvent(0, {});
                        this._raiseEvent(7, {});
                    }
                    a.jqx.aria(self, "aria-valuenow", this.decimal);
                    return;
                }
                r = this.decimal.toString();
                var d = this.getvalue("negative");
                if (0 == e && d) this._setSelectionStart(f.start + 1); else if (void 0 != r && (void 0 == g || g.toString().length == r.length)) this._setSelectionStart(f.start); else if (d) this._setSelectionStart(f.start + 1); else this._setSelectionStart(f.start - 1);
                if (c != this.decimal) {
                    if (a.jqx.mobile.isTouchDevice()) this._raiseEvent(0, {});
                    this._raiseEvent(7, {});
                }
                a.jqx.aria(self, "aria-valuenow", this.decimal);
            }
        },
        _getspindecimal: function() {
            var a = this._selection();
            var b = "";
            var c = this._getSeparatorPosition();
            var d = this._getVisibleItems();
            var e = this._getHiddenPrefixCount();
            var f = this.numberInput.val();
            if (this.numberInput.val().length == a.start && 0 == a.length) {
                this._setSelection(a.start, a.start + 1);
                a = this._selection();
            }
            var g = "advanced" != this.inputMode;
            for (var h = 0; h < a.start; h++) {
                if (g) {
                    var i = f.substring(h, h + 1);
                    var j = !isNaN(parseInt(i));
                    if (j) b += i;
                    if (i == this.decimalSeparator) b += i;
                    continue;
                }
                if (d[h].canEdit && d[h].character != this.promptChar) b += d[h].character; else if (!d[h].canEdit && this.decimalSeparatorPosition != -1 && d[h] == d[this.decimalSeparatorPosition - e]) {
                    if (0 == b.length) b = "0";
                    b += d[h].character;
                }
            }
            var k = "";
            for (var h = a.start; h < d.length; h++) {
                if (g) {
                    var i = f.substring(h, h + 1);
                    var j = !isNaN(parseInt(i));
                    if (j) k += i;
                    if (i == this.decimalSeparator) k += i;
                    continue;
                }
                if (d[h].canEdit && d[h].character != this.promptChar) k += d[h].character; else if (!d[h].canEdit && this.decimalSeparatorPosition != -1 && d[h] == d[this.decimalSeparatorPosition - e]) k += d[h].character;
            }
            var l = this.getvalue("negative");
            var m = l ? "-" + this._parseDecimalValue(b).toString() : this._parseDecimalValue(b).toString();
            return {
                decimal: m,
                afterdecimal: this._parseDecimalValue(k)
            };
        },
        _parseDecimalValue: function(a) {
            if ("." != this.decimalSeparator) {
                var b = a.toString().indexOf(this.decimalSeparator);
                if (b >= 0) {
                    var c = a.toString().substring(0, b) + "." + a.toString().substring(b + 1);
                    return c;
                }
            }
            return a;
        },
        _parseDecimalValueToEditorValue: function(a) {
            if ("." != this.decimalSeparator) {
                var b = a.toString().indexOf(".");
                if (b >= 0) {
                    var c = a.toString().substring(0, b) + this.decimalSeparator + a.toString().substring(b + 1);
                    return c;
                }
            }
            return a;
        },
        spinUp: function() {
            var b = this;
            var c = this.decimal;
            if ("none" == b.spinMode) return;
            if (null == this.decimal) {
                this.setDecimal(0);
                return;
            }
            if (a.jqx.mobile.isTouchDevice() || "textbox" == this.inputMode) b._doTouchHandling();
            var d = this.getvalue("negative");
            var e = d ? -1 : 0;
            if (!b.disabled) {
                var f = this._selection();
                var g = b.decimal;
                var h = b.getDecimal();
                if (h < this.min) {
                    h = this.min;
                    this.setDecimal(this.min);
                    this._setSelectionStart(f.start);
                    this.spinUp();
                    return;
                } else if (h > this.max) {
                    h = this.max;
                    this.setDecimal(this.max);
                    this._setSelectionStart(f.start);
                    this.spinUp();
                    return;
                }
                if (b.spinButtonsStep < 0) b.spinButtonsStep = 1;
                var i = parseInt(b.decimal) + b.spinButtonsStep;
                i = i.toString().length;
                var j = e + i <= b.digits;
                if ("advanced" != b.spinMode) {
                    if (h + b.spinButtonsStep <= b.max && j) {
                        var k = 1;
                        for (var l = 0; l < b.decimalDigits; l++) k = 10 * k;
                        var m = k * h + k * b.spinButtonsStep;
                        m /= k;
                        m = this._parseDecimalValueToEditorValue(m);
                        b.setDecimal(m);
                    }
                } else {
                    var n = this._getspindecimal();
                    var o = this._getSeparatorPosition();
                    var h = parseFloat(n.decimal);
                    if (b.spinButtonsStep < 0) b.spinButtonsStep = 1;
                    var i = parseInt(h) + b.spinButtonsStep;
                    i = i.toString().length;
                    var j = e + i <= b.digits;
                    var k = 1;
                    var p = n.decimal.indexOf(".");
                    if (p != -1) {
                        var q = n.decimal.length - p - 1;
                        var k = 1;
                        for (var l = 0; l < q; l++) k = 10 * k;
                        h += new Number(b.spinButtonsStep / k);
                        h = h.toFixed(q);
                        var p = h.toString().indexOf(".");
                        if (p == -1) h = h.toString() + ".";
                        var r = h.toString() + n.afterdecimal;
                        r = new Number(r);
                        r = r.toFixed(b.decimalDigits);
                        var s = new Number(r).toFixed(b.decimalDigits);
                        if (s <= b.max) {
                            r = this._parseDecimalValueToEditorValue(r);
                            b.setDecimal(r);
                        } else r = void 0;
                    } else if (h + b.spinButtonsStep <= b.max && j) {
                        var m = k * h + k * b.spinButtonsStep;
                        m /= k;
                        var r = m.toString() + n.afterdecimal;
                        var s = new Number(r).toFixed(b.decimalDigits);
                        if (s <= b.max) {
                            r = this._parseDecimalValueToEditorValue(r);
                            if (d && r.indexOf("-") == -1) if ("-0" != n.decimal) r = "-" + r;
                            b.setDecimal(r);
                        } else r = void 0;
                    }
                }
                if (void 0 == r || "simple" != this.inputMode) {
                    this._setSelectionStart(f.start);
                    b.savedValue = b.numberInput[0].value;
                    if (c != this.decimal) {
                        if (a.jqx.mobile.isTouchDevice()) this._raiseEvent(0, {});
                        this._raiseEvent(7, {});
                    }
                    a.jqx.aria(self, "aria-valuenow", this.decimal);
                    return;
                }
                r = this.decimal.toString();
                var d = this.getvalue("negative");
                if (e == -1 && !d) this._setSelectionStart(-1 + f.start); else if (void 0 != r && (void 0 == g || g.toString().length == r.length)) this._setSelectionStart(f.start); else if (d) this._setSelectionStart(f.start); else this._setSelectionStart(1 + f.start);
                if (c != this.decimal) {
                    if (a.jqx.mobile.isTouchDevice()) this._raiseEvent(0, {});
                    this._raiseEvent(7, {});
                }
                a.jqx.aria(self, "aria-valuenow", this.decimal);
            }
        },
        _exitSimpleInputMode: function(b, c, d, e) {
            if (void 0 == c) c = b.data;
            if (null == c) return;
            if (void 0 == d) {
                if (null != b.target && null != c.element) if (void 0 != b.target.id && b.target.id.toString().length > 0 && c.host.find("#" + b.target.id).length > 0 || b.target == c.element) return;
                var f = c.host.offset();
                var g = f.left;
                var h = f.top;
                var i = c.host.width();
                var j = c.host.height();
                var k = a(b.target).offset();
                if (k.left >= g && k.left <= g + i) if (k.top >= h && k.top <= h + j) return;
            }
            if (a.jqx.mobile.isOperaMiniBrowser()) c.numberInput.attr("readonly", true);
            if (c.disabled || c.readOnly) return;
            var l = a.data(c.numberInput, "simpleInputMode");
            if (null == l) return;
            a.data(c.numberInput, "simpleInputMode", null);
            this._parseDecimalInSimpleMode();
            return false;
        },
        _getDecimalInSimpleMode: function() {
            var a = this.decimal;
            if ("." != this.decimalSeparator) {
                var b = a.toString().indexOf(this.decimalSeparator);
                if (b > 0) {
                    var c = a.toString().substring(0, b);
                    var a = c + "." + a.toString().substring(b + 1);
                }
            }
            return a;
        },
        _parseDecimalInSimpleMode: function(a) {
            var b = this;
            var c = b.getvalue("negative");
            var d = this.ValueString;
            if (void 0 == d) d = this.GetValueString(this.numberInput.val(), this.decimalSeparator, "" != this.decimalSeparator);
            if ("." != this.decimalSeparator) {
                var e = d.toString().indexOf(".");
                if (e > 0) {
                    var f = d.toString().substring(0, e);
                    var g = f + this.decimalSeparator + d.toString().substring(e + 1);
                    d = g;
                }
            }
            var h = c ? "-" : "";
            if ("left" == this.symbolPosition) h += this.symbol;
            var i = this.digits % this.groupSize;
            if (0 == i) i = this.groupSize;
            var j = d.toString();
            if (j.indexOf("-") >= 0) j = j.substring(j.indexOf("-") + 1);
            h += j;
            if ("right" == this.symbolPosition) h += this.symbol;
            if (false != a) b.numberInput.val(h);
        },
        _enterSimpleInputMode: function(b, c) {
            if (void 0 == c) c = b.data;
            var d = this._selection();
            if (null == c) return;
            var e = c.getvalue("negative");
            var f = c.decimal;
            if (e) if (f > 0) f = -f;
            c.numberInput.val(f);
            a.data(c.numberInput, "simpleInputMode", true);
            if (a.jqx.mobile.isOperaMiniBrowser()) c.numberInput.attr("readonly", false);
            this._parseDecimalInSimpleMode();
            this._setSelectionStart(d.start);
        },
        setvalue: function(a, b) {
            if (void 0 !== this[a]) if ("decimal" == a) this._setDecimal(b); else {
                this[a] = b;
                this.propertyChangedHandler(this, a, b, b);
            }
        },
        getvalue: function(a) {
            if ("decimal" == a) if (void 0 != this.negative && true == this.negative) return -Math.abs(this[a]);
            if (a in this) return this[a];
            return null;
        },
        _getString: function() {
            var a = "";
            for (var b = 0; b < this.items.length; b++) {
                var c = this.items[b].character;
                a += c;
            }
            return a;
        },
        _literal: function(a, b, c, d) {
            return {
                character: a,
                regex: b,
                canEdit: c,
                isSeparator: d
            };
        },
        _initializeLiterals: function() {
            if ("textbox" == this.inputMode) return;
            var a = 0;
            var b = this.negativeSymbol.length;
            for (var c = 0; c < b; c++) {
                var d = this.negativeSymbol.substring(c, c + 1);
                var e = "";
                var f = false;
                var g = null;
                if (this.negative) g = this._literal(d, e, f, false); else g = this._literal("", e, f, false);
                this.items[a] = g;
                a++;
            }
            var h = this.symbol.length;
            if ("left" == this.symbolPosition) for (c = 0; c < h; c++) {
                var d = this.symbol.substring(c, c + 1);
                var e = "";
                var f = false;
                var g = this._literal(d, e, f, false);
                this.items[a] = g;
                a++;
            }
            var i = this.digits % this.groupSize;
            if (0 == i) i = this.groupSize;
            for (var c = 0; c < this.digits; c++) {
                var d = this.promptChar;
                var e = "\\d";
                var f = true;
                var g = this._literal(d, e, f, false);
                this.items[a] = g;
                a++;
                if (c < this.digits - 1 && void 0 != this.groupSeparator && this.groupSeparator.length > 0) {
                    i--;
                    if (0 == i) {
                        i = this.groupSize;
                        var j = this._literal(this.groupSeparator, "", false, false);
                        this.items[a] = j;
                        a++;
                    }
                } else if (c == this.digits - 1) g.character = 0;
            }
            this.decimalSeparatorPosition = -1;
            if (void 0 != this.decimalDigits && this.decimalDigits > 0) {
                var d = this.decimalSeparator;
                if (0 == d.length) d = ".";
                var g = this._literal(d, "", false, true);
                this.items[a] = g;
                this.decimalSeparatorPosition = a;
                a++;
                for (var c = 0; c < this.decimalDigits; c++) {
                    var k = 0;
                    var e = "\\d";
                    var l = this._literal(k, e, true, false);
                    this.items[a] = l;
                    a++;
                }
            }
            if ("right" == this.symbolPosition) for (var c = 0; c < h; c++) {
                var d = this.symbol.substring(c, c + 1);
                var e = "";
                var f = false;
                var g = this._literal(d, e, f);
                this.items[a] = g;
                a++;
            }
        },
        _match: function(a, b) {
            var c = new RegExp(b, "i");
            return c.test(a);
        },
        _raiseEvent: function(b, c) {
            var d = this.events[b];
            var e = {};
            e.owner = this;
            if ("none" == this.host.css("display")) return true;
            var f = c.charCode ? c.charCode : c.keyCode ? c.keyCode : 0;
            var g = true;
            var h = this.readOnly;
            var i = this;
            if (3 == b || 2 == b) if (!this.disabled) if ("simple" != this.inputMode && "textbox" != this.inputMode) this._handleMouse(c); else return true;
            if (0 == b) {
                var j = this.getvalue("decimal");
                if (this.max < j || this.min > j) this.host.addClass(this.toThemeProperty("jqx-input-invalid")); else {
                    this.host.removeClass(this.toThemeProperty("jqx-input-invalid"));
                    this.host.addClass(this.toThemeProperty("jqx-input"));
                    this.host.addClass(this.toThemeProperty("jqx-rc-all"));
                }
            }
            var k = new a.Event(d);
            k.owner = this;
            e.value = this.getvalue("decimal");
            e.text = this.numberInput.val();
            k.args = e;
            if (7 == b) {
                e.type = this.changeType;
                this.changeType = null;
            }
            if (void 0 != d) if (4 != b && 5 != b && 6 != b) g = this.host.trigger(k);
            var i = this;
            if ("textbox" == this.inputMode) return g;
            if ("simple" != this.inputMode) {
                if (4 == b) {
                    if (h || this.disabled) return false;
                    g = i._handleKeyDown(c, f);
                } else if (5 == b) {
                    if (h || this.disabled) g = false;
                } else if (6 == b) {
                    if (h || this.disabled) return false;
                    g = i._handleKeyPress(c, f);
                }
            } else if (4 == b || 5 == b || 6 == b) {
                if (a.jqx.mobile.isTouchDevice() || true === this.touchMode) return true;
                if (h || this.disabled) return false;
                var l = String.fromCharCode(f);
                var m = parseInt(l);
                var n = true;
                if (!c.ctrlKey && !c.shiftKey && !c.metaKey) if (f >= 65 && f <= 90) n = false;
                if (6 == b && void 0 != a.jqx.browser.opera) if (8 == f) return false;
                if (n) {
                    if (4 == b) n = i._handleSimpleKeyDown(c, f);
                    if (189 == f || 45 == f || 109 == f || 173 == f) {
                        var o = i._selection();
                        if (4 == b) {
                            var p = i.getvalue("negative");
                            if (false == p) i.setvalue("negative", true); else i.setvalue("negative", false);
                            i.decimal = i.ValueString;
                            i._parseDecimalInSimpleMode();
                            i._setSelectionStart(o.start);
                            n = false;
                            i._raiseEvent(0, i.value);
                            i._raiseEvent(1, i.numberInput.val());
                        }
                    }
                    var q = e.ctrlKey || e.metaKey;
                    if (!a.jqx.browser.msie) {
                        var r = c;
                        if (q && 99 == f || q && 67 == f || q && 122 == f || q && 90 == f || q && 118 == f || q && 86 == f || r.shiftKey && 45 == f) {
                            if (a.jqx.browser.webkit || a.jqx.browser.chrome) i._handleSimpleKeyDown(c, f);
                            if (67 == f) return true;
                            return false;
                        }
                    }
                    if (q && 97 == f || q && 65 == f) return true;
                    if (6 == b && n) {
                        var s = this._isSpecialKey(f);
                        return s;
                    }
                }
                return n;
            }
            return g;
        },
        GetSelectionInValue: function(a, b, c, d) {
            var e = 0;
            for (i = 0; i < b.length; i++) {
                if (i >= a) break;
                var f = b.substring(i, i + 1);
                var g = !isNaN(parseInt(f));
                if (g || d && b.substring(i, i + 1) == c) e++;
            }
            return e;
        },
        GetSelectionLengthInValue: function(a, b, c, d) {
            var e = 0;
            for (i = 0; i < c.length; i++) {
                if (i >= a + b) break;
                var f = c.substring(i, i + 1);
                var g = !isNaN(parseInt(f));
                if (b > 0 && i >= a && g || i >= a && c[i].toString() == d) e++;
            }
            return e;
        },
        GetInsertTypeByPositionInValue: function(a, b, c, d) {
            var e = "before";
            var f = this.GetValueString(c, b, d);
            var g = this.GetDigitsToSeparator(0, f, b);
            if (a > g) e = "after";
            return e;
        },
        RemoveRange: function(a, b, c, d, e, f) {
            var g = this.digits;
            var h = a;
            var i = b;
            var j = 0;
            var k = this.decimal;
            var l = this._selection();
            var d = this.decimalSeparator;
            var m = "" != d;
            if (0 == i && this.ValueString.length < this.decimalPossibleChars - 1) return j;
            var n = this.GetSeparatorPositionInText(d, c);
            if (!e) n = this.GetSeparatorPositionInText(d, c);
            if (n < 0 && !m && c.length > 1) n = c.length;
            if (n == -1) n = c.length;
            var o = m ? 1 : 0;
            if (b < 2 && true == f) {
                var p = this.ValueString.length - this.decimalDigits - o;
                if (p == g && a + b < n) i++;
            }
            var q = "";
            for (var r = 0; r < c.length; r++) {
                if (r < h || r >= h + i) {
                    q += c.substring(r, r + 1);
                    continue;
                } else {
                    var s = c.substring(r, r + 1);
                    if (s == d) {
                        q += d;
                        continue;
                    } else {
                        var s = c.substring(r, r + 1);
                        if (this.symbol && "" != this.symbol && this.symbol.indexOf(s) >= 0) continue;
                        if (r > n) {
                            q += "0";
                            continue;
                        }
                    }
                }
                var s = c.substring(r, r + 1);
                var t = !isNaN(parseInt(s));
                if (t) j++;
            }
            if (0 == q.length) q = "0";
            if (e) this.numberInput.val(q); else this.ValueString = q;
            var u = q.substring(0, 1);
            if (u == d && isNaN(parseInt(u))) {
                var v = "0" + q;
                q = v;
            }
            this.ValueString = this.GetValueString(q, d, m);
            this.decimal = this.ValueString;
            this._parseDecimalInSimpleMode();
            this._setSelectionStart(h);
            return j;
        },
        InsertDigit: function(a, b) {
            if ("number" != typeof this.digits) this.digits = parseInt(this.digits);
            if ("number" != typeof this.decimalDigits) this.decimalDigits = parseInt(this.decimalDigits);
            var c = 1 + this.digits;
            var d = this._selection();
            var e = this.getvalue("negative");
            var f = false;
            if (0 == d.start && "" != this.symbol && "left" == this.symbolPosition) {
                this._setSelectionStart(d.start + 1);
                d = this._selection();
                f = true;
            }
            if (e && f || e && !f && 0 == d.start) {
                this._setSelectionStart(d.start + 1);
                d = this._selection();
            }
            var g = this.numberInput.val().substring(d.start, d.start + 1);
            var h = this.numberInput.val();
            var i = this.decimalSeparator;
            var j = "" != i && this.decimalDigits > 0;
            if (g == this.symbol && "right" == this.symbolPosition) if (0 == this.decimalDigits) {
                this.ValueString = this.GetValueString(h, i, j);
                if (this.ValueString.length >= c) return;
            } else return;
            this.ValueString = this.GetValueString(h, i, j);
            if ("" == this.ValueString) this.ValueString = new Number(0).toFixed(this.decimalDigits);
            var k = this.ValueString;
            if (this.decimalDigits > 0 && b >= k.length) b = k.length - 1;
            var l = "";
            if (b < k.length) l = k.substring(b, b + 1);
            var m = false;
            var n = false;
            var o = this.GetInsertTypeByPositionInValue(b, i, h, j);
            if ("after" == o) m = true;
            var p = j ? 1 : 0;
            if (l != i && this.ValueString.length - this.decimalDigits - p >= c - 1) m = true;
            if ("0" === l && 1 === this.ValueString.length && 0 === this.decimalDigits) m = true;
            var q = false;
            var r = j ? 1 : 0;
            if (!m && this.ValueString && this.ValueString.length >= this.digits + this.decimalDigits + r) return;
            if (m && l != i) {
                if (q) b++;
                var s = k.substring(0, b);
                if (s.length == k.length) if (this.ValueString.length >= this.digits + this.decimalDigits + r) return;
                var t = a;
                var u = "";
                if (b + 1 < k.length) u = k.substring(b + 1);
                var v = s + t + u;
                this.ValueString = v;
            } else {
                var s = k.substring(0, b);
                var t = a;
                var u = k.substring(b);
                var v = s + t + u;
                if ("0" == k.substring(0, 1) && k.substring(1, 2) == i) {
                    v = t + k.substring(1);
                    if (l == i) {
                        this._setSelectionStart(d.start - 1);
                        d = this._selection();
                    }
                }
                this.ValueString = v;
            }
            if (e) this.decimal = -this.ValueString; else this.decimal = this.ValueString;
            this._parseDecimalInSimpleMode();
            var w = d.start;
            w += 1;
            this._setSelectionStart(w);
            this.value = this.decimal;
            this._raiseEvent(0, this.value);
            this._raiseEvent(1, this.numberInput.val());
        },
        GetStringToSeparator: function(a, b, c) {
            var d = "";
            var e = b;
            var f = this.GetSeparatorPositionInText(b, a);
            var g = a.subString(0, f);
            d = this.GetValueString(g, b, c);
            return d;
        },
        GetSeparatorPositionInText: function(a, b) {
            var c = -1;
            for (i = 0; i < b.length; i++) if (b.substring(i, i + 1) == a) {
                c = i;
                break;
            }
            return c;
        },
        GetValueString: function(a, b, c) {
            var d = "";
            for (var e = 0; e < a.length; e++) {
                var f = a.substring(e, e + 1);
                var g = !isNaN(parseInt(f));
                if (g) d += f;
                if (f == b) d += b;
            }
            return d;
        },
        Backspace: function() {
            var a = this._selection();
            var b = this._selection();
            var c = this.numberInput.val();
            if (0 == a.start && 0 == a.length) return;
            this.isBackSpace = true;
            var d = c.substring[(a.start, a.start + 1)];
            var e = !isNaN(parseInt(d));
            if (a.start > 0 && 0 == a.length) {
                this._setSelectionStart(a.start - 1);
                var a = this._selection();
            }
            this.Delete();
            this._setSelectionStart(b.start - 1);
            this.isBackSpace = false;
        },
        Delete: function(a) {
            var b = this._selection();
            var c = this.numberInput.val();
            if (0 === b.start && "-" == c.substring(0, 1)) {
                this.setvalue("negative", false);
                var b = this._selection();
                var c = this.numberInput.val();
            }
            var d = b.start;
            var e = b.length;
            e = Math.max(e, 1);
            this.ValueString = this.GetValueString(c, this.decimalSeparator, "" != this.decimalSeparator);
            if (d > this.ValueString.indexOf(this.decimalSeparator) && this.decimalDigits > 0) d++;
            this.RemoveRange(b.start, e, this.ValueString, ".", false);
            var f = this.ValueString.substring(0, 1);
            var g = !isNaN(parseInt(f));
            if (!g) this.ValueString = "0" + this.ValueString;
            this.decimal = this.ValueString;
            this._parseDecimalInSimpleMode();
            this._setSelectionStart(d);
            this.value = this.decimal;
            this._raiseEvent(0, this.value);
            this._raiseEvent(1, this.numberInput.val());
        },
        insertsimple: function(a) {
            var b = this._selection();
            var c = this.numberInput.val();
            if (b.start == c.length && null != this.decimal && this.decimalDigits > 0) return;
            var d = this.decimal;
            var e = this.decimalSeparator;
            this.ValueString = this.GetValueString(c, e, "" != e);
            var f = this.GetSelectionInValue(b.start, c, e, "" != e);
            var g = this.GetSelectionLengthInValue(b.start, b.length, c, e);
            var h = this.GetDigitsToSeparator(0, this.ValueString, e);
            var i = false;
            if (this.decimalDigits > 0 && f >= this.ValueString.length) f--;
            if ("" == this.ValueString) {
                this.ValueString = new Number(0).toFixed(this.decimalDigits);
                this.ValueString = this.ValueString.replace(".", e);
                this.RemoveRange(b.start, g, this.ValueString, e, false, true);
                this.InsertDigit(a, 0, b);
                return;
            }
            this.RemoveRange(b.start, g, this.ValueString, e, false, true);
            this.InsertDigit(a, f, b);
        },
        GetDigitsToSeparator: function(a, b, c) {
            if (void 0 == c) c = ".";
            if (b.indexOf(c) < 0) return b.length;
            for (i = 0; i < b.length; i++) if (b.substring(i, i + 1) == c) {
                a = i;
                break;
            }
            return a;
        },
        _handleSimpleKeyDown: function(b, c) {
            var d = this._selection();
            var e = b.ctrlKey || b.metaKey;
            if ((8 == c || 46 == c) && e) {
                this.setDecimal(null);
                return false;
            }
            if (d.start >= 0 && d.start < this.items.length) var f = String.fromCharCode(c);
            if (this.rtl && 37 == c) {
                var g = b.shiftKey;
                var h = g ? 1 : 0;
                if (g) this._setSelection(d.start + 1 - h, d.start + d.length + 1); else this._setSelection(d.start + 1 - h, d.start + 1);
                return false;
            } else if (this.rtl && 39 == c) {
                var g = b.shiftKey;
                var h = g ? 1 : 0;
                if (g) this._setSelection(d.start - 1, d.length + h + d.start - 1); else this._setSelection(d.start - 1, d.start - 1);
                return false;
            }
            if (8 == c) {
                this.Backspace();
                return false;
            }
            if (190 == c || 110 == c) {
                var i = this.GetSeparatorPositionInText(this.decimalSeparator, this.numberInput.val());
                if (i != -1) this._setSelectionStart(i + 1);
                return false;
            }
            if (188 == c) {
                var j = this.numberInput.val();
                for (m = d.start; m < j.length; m++) if (j[m] == this.groupSeparator) {
                    this._setSelectionStart(1 + m);
                    break;
                }
                return false;
            }
            var e = b.ctrlKey || b.metaKey;
            if (e && 99 == c || e && 67 == c) {
                var d = this._selection();
                var k = "";
                var l = this.numberInput.val();
                if (d.start > 0 || d.length > 0) for (var m = d.start; m < d.end; m++) k += l.substring(m, m + 1);
                a.data(document.body, "jqxSelection", k);
                if (a.jqx.browser.msie) window.clipboardData.setData("Text", k); else {
                    var n = this;
                    var o = a('<textarea style="position: absolute; left: -1000px; top: -1000px;"/>');
                    o.val(k);
                    a("body").append(o);
                    o.select();
                    setTimeout(function() {
                        document.designMode = "off";
                        o.select();
                        o.remove();
                        n.focus();
                    }, 100);
                }
                this.savedText = k;
                return true;
            }
            if (e && 122 == c || e && 90 == c) return false;
            if (e && 118 == c || e && 86 == c || b.shiftKey && 45 == c) {
                if (a.jqx.browser.msie && !this.savedText) this.savedText = window.clipboardData.getData("Text");
                if (null != this.savedText && this.savedText.length > 0) this.val(this.savedText); else this.val(a.data(document.body, "jqxSelection"));
                return false;
            }
            var f = String.fromCharCode(c);
            var p = parseInt(f);
            if (c >= 96 && c <= 105) {
                p = c - 96;
                c -= 48;
            }
            if (!isNaN(p)) {
                var n = this;
                this.insertsimple(p);
                return false;
            }
            if (46 == c) {
                this.Delete();
                return false;
            }
            if (38 == c) {
                this.spinUp();
                return false;
            } else if (40 == c) {
                this.spinDown();
                return false;
            }
            var q = this._isSpecialKey(c);
            if (!a.jqx.browser.mozilla) return true;
            return q;
        },
        _getEditRange: function() {
            var a = 0;
            var b = 0;
            for (i = 0; i < this.items.length; i++) if (this.items[i].canEdit) {
                a = i;
                break;
            }
            for (i = this.items.length - 1; i >= 0; i--) if (this.items[i].canEdit) {
                b = i;
                break;
            }
            return {
                start: a,
                end: b
            };
        },
        _getVisibleItems: function() {
            var a = new Array();
            var b = 0;
            for (i = 0; i < this.items.length; i++) if (this.items[i].character.toString().length > 0) {
                a[b] = this.items[i];
                b++;
            }
            return a;
        },
        _hasEmptyVisibleItems: function() {
            var a = this._getVisibleItems();
            for (i = 0; i < a.length; i++) if (a[i].canEdit && a[i].character == this.promptChar) return true;
            return false;
        },
        _getFirstVisibleNonEmptyIndex: function() {
            var a = this._getVisibleItems();
            for (i = 0; i < a.length; i++) if (a[i].canEdit && a[i].character != this.promptChar) return i;
        },
        _handleMouse: function(a, b) {
            var c = this._selection();
            if (c.length <= 1) {
                var d = this._getFirstVisibleNonEmptyIndex();
                if (c.start < d) this._setSelectionStart(d);
            }
        },
        _insertKey: function(b) {
            this.numberInput[0].focus();
            var c = String.fromCharCode(b);
            var d = parseInt(c);
            if (isNaN(d)) return;
            var e = 0;
            for (i = 0; i < this.items.length; i++) if (0 == this.items[i].character.length) e++;
            var f = this._selection();
            var g = this;
            if (f.start >= 0 && f.start <= this.items.length) {
                var h = false;
                var k = this._getFirstVisibleNonEmptyIndex();
                if (f.start < k && 0 == f.length) if (!isNaN(c) || " " == c) {
                    this._setSelectionStart(k);
                    f = this._selection();
                }
                var l = this._getFirstEditableItemIndex();
                var m = this._getLastEditableItemIndex();
                var n = this._getVisibleItems();
                a.each(n, function(a, b) {
                    if (f.start > a && a != n.length - 1) return;
                    var d = n[a];
                    if (a > m) d = n[m];
                    if (isNaN(c) || " " == c) return;
                    if (!d.canEdit) return;
                    var i = g._getSeparatorPosition();
                    if (g._match(c, d.regex)) {
                        if (!h && f.length > 0) {
                            for (j = f.start + e; j < f.end + e; j++) if (g.items[j].canEdit) if (j > i) g.items[j].character = "0"; else g.items[j].character = g.promptChar;
                            var k = g._getString();
                            h = true;
                        }
                        var i = g._getSeparatorPosition();
                        var l = g._hasEmptyVisibleItems();
                        if (null == g.decimal) {
                            f.start = i - 1;
                            if (f.start < 0) f.start = 0;
                            f.end = f.start;
                        }
                        if (f.start <= i && l) {
                            var o = a;
                            if (g.decimalSeparatorPosition == -1 && f.start == i) o = a + 1;
                            if (null == g.decimal) o = f.start;
                            var q = "";
                            for (p = 0; p < o; p++) if (n[p].canEdit && n[p].character != g.promptChar) q += n[p].character;
                            q += c;
                            var r = g.decimal < 1 ? 1 : 0;
                            if (f.start == i && g.decimalSeparatorPosition != -1) {
                                q += g.decimalSeparator;
                                r = 0;
                            }
                            for (p = o + r; p < n.length; p++) if (n[p].character == g.decimalSeparator && n[p].isSeparator) q += n[p].character; else if (n[p].canEdit && n[p].character != g.promptChar) q += n[p].character;
                            if ("." != g.decimalSeparator) q = g._parseDecimalValue(q);
                            q = parseFloat(q).toString();
                            q = new Number(q);
                            q = q.toFixed(g.decimalDigits);
                            if ("." != g.decimalSeparator) q = g._parseDecimalValueToEditorValue(q);
                            g.setvalue("decimal", q);
                            var k = g._getString();
                            if (f.end < i) g._setSelectionStart(f.end + r); else g._setSelectionStart(f.end);
                            if (f.length >= 1) g._setSelectionStart(f.end);
                            if (f.length == g.numberInput.val().length) {
                                var s = g._moveCaretToDecimalSeparator();
                                var t = g.decimalSeparatorPosition >= 0 ? 1 : 0;
                                g._setSelectionStart(s - t);
                            }
                        } else if (f.start < i || f.start > i) {
                            if (g.numberInput.val().length == f.start && g.decimalSeparatorPosition != -1) return false; else if (g.numberInput.val().length == f.start && g.decimalSeparatorPosition == -1 && !l) return false;
                            var q = "";
                            var u = false;
                            for (p = 0; p < a; p++) {
                                if (n[p].canEdit && n[p].character != g.promptChar) q += n[p].character;
                                if (n[p].character == g.decimalSeparator && n[p].isSeparator) {
                                    q += n[p].character;
                                    u = true;
                                }
                            }
                            q += c;
                            var r = g.decimal < 1 ? 1 : 0;
                            if (!u && f.start == i - 1) {
                                q += g.decimalSeparator;
                                u = true;
                            }
                            for (p = a + 1; p < n.length; p++) if (!u && n[p].character == g.decimalSeparator && n[p].isSeparator) q += n[p].character; else if (n[p].canEdit && n[p].character != g.promptChar) q += n[p].character;
                            g.setvalue("decimal", q);
                            var k = g._getString();
                            if (g.decimalSeparatorPosition < 0 && d == n[m]) {
                                g._setSelectionStart(a);
                                return false;
                            }
                            var v = k.indexOf(g.symbol);
                            var w = !g.getvalue("negative") ? 0 : 1;
                            if (v <= w) v = k.length;
                            if (f.start < v) g._setSelectionStart(a + 1); else g._setSelectionStart(a);
                            if (f.length >= 1) ;
                            if (f.length == g.numberInput.val().length) {
                                var s = g._moveCaretToDecimalSeparator();
                                g._setSelectionStart(s - 1);
                            }
                        }
                        return false;
                    }
                });
            }
        },
        _handleKeyPress: function(b, c) {
            var d = this._selection();
            var e = this;
            var f = b.ctrlKey || b.metaKey;
            if (f && 97 == c || f && 65 == c) return true;
            if (8 == c) {
                if (d.start > 0) e._setSelectionStart(d.start);
                return false;
            }
            if (46 == c) {
                if (d.start < this.items.length) e._setSelectionStart(d.start);
                return false;
            }
            if (!a.jqx.browser.mozilla) if (45 == c || 173 == c || 109 == c || 189 == c) {
                var g = this.getvalue("negative");
                if (false == g) this.setvalue("negative", true); else this.setvalue("negative", false);
            }
            if (a.jqx.browser.msie) this._insertKey(c);
            var h = this._isSpecialKey(c);
            return h;
        },
        _deleteSelectedText: function() {
            var a = this._selection();
            var b = "";
            var c = this._getSeparatorPosition();
            var d = this._getVisibleItems();
            var e = this._getHiddenPrefixCount();
            if (this.numberInput.val().length == a.start && 0 == a.length) {
                this._setSelection(a.start, a.start + 1);
                a = this._selection();
            }
            for (i = 0; i < a.start; i++) if (d[i].canEdit && d[i].character != this.promptChar) b += d[i].character; else if (!d[i].canEdit && this.decimalSeparatorPosition != -1 && d[i] == d[this.decimalSeparatorPosition - e]) {
                if (0 == b.length) b = "0";
                b += d[i].character;
            }
            for (i = a.start; i < a.end; i++) if (i > c && this.decimalSeparatorPosition != -1) {
                if (d[i].canEdit && d[i].character != this.promptChar) b += "0";
            } else if (!d[i].canEdit && this.decimalSeparatorPosition != -1 && d[i] == d[this.decimalSeparatorPosition - e]) {
                if (0 == b.length) b = "0";
                b += d[i].character;
            }
            for (i = a.end; i < d.length; i++) if (d[i].canEdit && d[i].character != this.promptChar) b += d[i].character; else if (!d[i].canEdit && this.decimalSeparatorPosition != -1 && d[i] == d[this.decimalSeparatorPosition - e]) {
                if (0 == b.length) b = "0";
                b += d[i].character;
            }
            this.setvalue("decimal", b);
            return a.length > 0;
        },
        _restoreInitialState: function() {
            var a = parseInt(this.decimalDigits);
            if (a > 0) a += 2;
            for (k = this.items.length - 1; k > this.items.length - 1 - a; k--) if (this.items[k].canEdit && this.items[k].character == this.promptChar) this.items[k].character = 0;
        },
        clear: function() {
            this.setDecimal(0);
        },
        clearDecimal: function() {
            if ("textbox" == this.inputMode) {
                this.numberInput.val();
                return;
            }
            for (var a = 0; a < this.items.length; a++) if (this.items[a].canEdit) this.items[a].character = this.promptChar;
            this._restoreInitialState();
        },
        _saveSelectedText: function() {
            var b = this._selection();
            var c = "";
            var d = this._getVisibleItems();
            if (b.start > 0 || b.length > 0) for (i = b.start; i < b.end; i++) if (d[i].canEdit && d[i].character != this.promptChar) c += d[i].character; else if (d[i].isSeparator) c += d[i].character;
            if (a.jqx.browser.msie) window.clipboardData.setData("Text", c);
            return c;
        },
        _pasteSelectedText: function() {
            var b = this._selection();
            var c = "";
            var d = 0;
            this.selectedText = a.data(document.body, "jqxSelection");
            if (window.clipboardData) {
                var e = window.clipboardData.getData("Text");
                if (e != this.selectedText && e.length > 0) {
                    this.selectedText = window.clipboardData.getData("Text");
                    if (null == this.selectedText || void 0 == this.selectedText) return;
                }
            }
            var f = b.start;
            var g = this._getVisibleItems();
            if (null != this.selectedText) for (var h = 0; h < this.selectedText.length; h++) {
                var i = parseInt(this.selectedText[h]);
                if (!isNaN(i)) {
                    var j = 48 + i;
                    this._insertKey(j);
                }
            }
        },
        _getHiddenPrefixCount: function() {
            var a = 0;
            if (!this.negative) a++;
            if ("left" == this.symbolPosition) for (i = 0; i < this.symbol.length; i++) if ("" == this.symbol.substring(i, i + 1)) a++;
            return a;
        },
        _getEditableItem: function() {
            var a = this._selection();
            for (i = 0; i < this.items.length; i++) if (i < a.start) if (this.items[i].canEdit && this.items[i].character != this.promptChar) return this.items[i];
            return null;
        },
        _getEditableItems: function() {
            var a = new Array();
            var b = 0;
            for (i = 0; i < this.items.length; i++) if (this.items[i].canEdit) {
                a[b] = this.items[i];
                b++;
            }
            return a;
        },
        _getValidSelectionStart: function(a) {
            for (i = this.items.length - 1; i >= 0; i--) if (this.items[i].canEdit && this.items[i].character != this.promptChar) return i;
            return -1;
        },
        _getEditableItemIndex: function(a) {
            var b = this._selection();
            var c = this._getHiddenPrefixCount();
            var d = this._getVisibleItems();
            var e = b.start;
            var f = -1;
            for (i = 0; i < e; i++) if (i < d.length && d[i].canEdit) f = i + c;
            if (f == -1 && b.length > 0) {
                e = b.end;
                for (i = 0; i < e; i++) if (i < d.length && d[i].canEdit) {
                    f = i + c;
                    break;
                }
            }
            return f;
        },
        _getEditableItemByIndex: function(a) {
            for (k = 0; k < this.items.length; k++) if (k > a) if (this.items[k].canEdit && this.items[k].character != this.promptChar) return k;
            return -1;
        },
        _getFirstEditableItemIndex: function() {
            var a = this._getVisibleItems();
            for (m = 0; m < a.length; m++) if (a[m].character != this.promptChar && a[m].canEdit && "0" != a[m].character) return m;
            return -1;
        },
        _getLastEditableItemIndex: function() {
            var a = this._getVisibleItems();
            for (m = a.length - 1; m >= 0; m--) if (a[m].character != this.promptChar && a[m].canEdit) return m;
            return -1;
        },
        _moveCaretToDecimalSeparator: function() {
            for (i = this.items.length - 1; i >= 0; i--) if (this.items[i].character == this.decimalSeparator && this.items[i].isSeparator) {
                if (!this.negative) {
                    this._setSelectionStart(i);
                    return i;
                } else {
                    this._setSelectionStart(i + 1);
                    return i;
                }
                break;
            }
            return this.numberInput.val().length;
        },
        _handleBackspace: function() {
            var a = this._selection();
            var b = this._getHiddenPrefixCount();
            var c = this._getEditableItemIndex() - b;
            var d = this._getFirstVisibleNonEmptyIndex();
            var e = false;
            if (this.negative) {
                e = true;
                if (d >= c + 1 || 0 == a.start) {
                    this.setvalue("negative", false);
                    if (0 == a.length) {
                        this._setSelectionStart(a.start - 1);
                        var a = this._selection();
                    }
                }
            }
            if (c >= 0) {
                if (0 == a.length && c != -1) this._setSelection(c, c + 1);
                var f = a.start > this._getSeparatorPosition() + 1 && this.decimalSeparatorPosition > 0;
                if (f) a = this._selection();
                var g = this._deleteSelectedText();
                if (a.length < 1 || f) this._setSelectionStart(a.start); else if (a.length >= 1) this._setSelectionStart(a.end);
                if (a.length == this.numberInput.val().length || e) {
                    var h = this._moveCaretToDecimalSeparator();
                    this._setSelectionStart(h - 1);
                }
            } else this._setSelectionStart(a.start);
        },
        _handleKeyDown: function(b, c) {
            var d = this._selection();
            var e = b.ctrlKey || b.metaKey;
            if ((8 == c || 46 == c) && e) {
                this.setDecimal(null);
                return false;
            }
            if (this.rtl && 37 == c) {
                var f = b.shiftKey;
                var g = f ? 1 : 0;
                if (f) this._setSelection(d.start + 1 - g, d.start + d.length + 1); else this._setSelection(d.start + 1 - g, d.start + 1);
                return false;
            } else if (this.rtl && 39 == c) {
                var f = b.shiftKey;
                var g = f ? 1 : 0;
                if (f) this._setSelection(d.start - 1, d.length + g + d.start - 1); else this._setSelection(d.start - 1, d.start - 1);
                return false;
            }
            if (e && 97 == c || e && 65 == c) return true;
            if (e && 120 == c || e && 88 == c) {
                this.selectedText = this._saveSelectedText(b);
                a.data(document.body, "jqxSelection", this.selectedText);
                this._handleBackspace();
                return false;
            }
            if (e && 99 == c || e && 67 == c) {
                this.selectedText = this._saveSelectedText(b);
                a.data(document.body, "jqxSelection", this.selectedText);
                return false;
            }
            if (e && 122 == c || e && 90 == c) return false;
            if (e && 118 == c || e && 86 == c || b.shiftKey && 45 == c) {
                this._pasteSelectedText();
                return false;
            }
            if (d.start >= 0 && d.start < this.items.length) {
                var h = String.fromCharCode(c);
                var j = this.items[d.start];
            }
            if (8 == c) {
                this._handleBackspace();
                return false;
            }
            if (190 == c || 110 == c) {
                this._moveCaretToDecimalSeparator();
                return false;
            }
            if (188 == c) {
                var k = this.numberInput.val();
                for (i = d.start; i < k.length; i++) if (k[i] == this.groupSeparator) {
                    this._setSelectionStart(1 + i);
                    break;
                }
                return false;
            }
            if (null == a.jqx.browser.msie) {
                var h = String.fromCharCode(c);
                var l = parseInt(h);
                if (c >= 96 && c <= 105) {
                    l = c - 96;
                    c -= 48;
                }
                if (!isNaN(l)) {
                    var m = this;
                    m._insertKey(c);
                    return false;
                }
            }
            if (46 == c) {
                var n = this._getVisibleItems();
                if (d.start < n.length) {
                    var g = false == n[d.start].canEdit ? 2 : 1;
                    if (0 == d.start) if (this.negative) {
                        this.setvalue("negative", false);
                        if (0 == d.length) this._setSelectionStart(0);
                        var d = this._selection();
                        if (0 == d.length) return false;
                    }
                    if (0 == d.length) this._setSelection(d.start + g, d.start + g + d.length);
                    this._handleBackspace();
                    if (new Number(this.decimal) < 1 || d.start > this._getSeparatorPosition()) this._setSelectionStart(d.end + g); else if (d.start + 1 < this.decimalSeparatorPosition) this._setSelectionStart(d.end + g);
                }
                return false;
            }
            if (38 == c) {
                this.spinUp();
                return false;
            } else if (40 == c) {
                this.spinDown();
                return false;
            }
            var o = this._isSpecialKey(c);
            if (a.jqx.browser.mozilla) if (45 == c || 173 == c || 109 == c || 189 == c) {
                var p = this.getvalue("negative");
                if (false == p) this.setvalue("negative", true); else this.setvalue("negative", false);
            }
            if (!a.jqx.browser.mozilla) return true;
            return o;
        },
        _isSpecialKey: function(a) {
            if (8 != a && 9 != a && 13 != a && 35 != a && 36 != a && 37 != a && 39 != a && 27 != a && 46 != a) return false;
            return true;
        },
        _selection: function() {
            try {
                if ("selectionStart" in this.numberInput[0]) {
                    var a = this.numberInput[0];
                    var b = a.selectionEnd - a.selectionStart;
                    return {
                        start: a.selectionStart,
                        end: a.selectionEnd,
                        length: b,
                        text: a.value
                    };
                } else {
                    var c = document.selection.createRange();
                    if (null == c) return {
                        start: 0,
                        end: a.value.length,
                        length: 0
                    };
                    var d = this.numberInput[0].createTextRange();
                    var e = d.duplicate();
                    d.moveToBookmark(c.getBookmark());
                    e.setEndPoint("EndToStart", d);
                    var b = c.text.length;
                    return {
                        start: e.text.length,
                        end: e.text.length + c.text.length,
                        length: b,
                        text: c.text
                    };
                }
            } catch (f) {
                return {
                    start: 0,
                    end: 0,
                    length: 0
                };
            }
        },
        selectAll: function() {
            var a = this.numberInput;
            setTimeout(function() {
                if ("selectionStart" in a[0]) {
                    a[0].focus();
                    a[0].setSelectionRange(0, a[0].value.length);
                } else {
                    var b = a[0].createTextRange();
                    b.collapse(true);
                    b.moveEnd("character", a[0].value.length);
                    b.moveStart("character", 0);
                    b.select();
                }
            }, 10);
        },
        _setSelection: function(b, c) {
            if (true == this._disableSetSelection) return;
            var d = a.jqx.mobile.isTouchDevice();
            if (d || true == this.touchMode) return;
            try {
                if ("selectionStart" in this.numberInput[0]) {
                    this.numberInput[0].focus();
                    this.numberInput[0].setSelectionRange(b, c);
                } else {
                    var e = this.numberInput[0].createTextRange();
                    e.collapse(true);
                    e.moveEnd("character", c);
                    e.moveStart("character", b);
                    e.select();
                }
            } catch (f) {}
        },
        _setSelectionStart: function(b) {
            this._setSelection(b, b);
            a.data(this.numberInput, "selectionstart", b);
        },
        resize: function(a, b) {
            this.width = a;
            this.height = b;
            this._render(false);
        },
        _render: function(b) {
            var c = parseInt(this.host.css("border-left-width"));
            var d = parseInt(this.host.css("border-left-width"));
            var e = parseInt(this.host.css("border-left-width"));
            var f = parseInt(this.host.css("border-left-width"));
            this.numberInput.css("padding-top", "0px");
            this.numberInput.css("padding-bottom", "0px");
            this.host.height(this.height);
            this.host.width(this.width);
            var g = this.host.width();
            var h = this.host.height();
            this.numberInput.css({
                "border-left-width": 0,
                "border-right-width": 0,
                "border-bottom-width": 0,
                "border-top-width": 0
            });
            this.numberInput.css("text-align", this.textAlign);
            var i = this.numberInput.css("font-size");
            this.numberInput.css("height", parseInt(i) + 4 + "px");
            this.numberInput.css("width", g - 2);
            var j = h - 2 * e - parseInt(i) - 2;
            if (isNaN(j)) j = 0;
            if (j < 0) j = 0;
            if (this.spinButtons && this.spincontainer) {
                g -= parseInt(this.spinButtonsWidth - 2);
                var k = a.jqx.mobile.isTouchDevice();
                if (!k && true !== this.touchMode) {
                    this.spincontainer.width(this.spinButtonsWidth);
                    this.upbutton.width(this.spinButtonsWidth + 2);
                    this.downbutton.width(this.spinButtonsWidth + 2);
                    this.upbutton.height("50%");
                    this.downbutton.height("50%");
                    this.spincontainer.width(this.spinButtonsWidth);
                } else {
                    this.spincontainer.width(2 * this.spinButtonsWidth);
                    g -= this.spinButtonsWidth;
                    this.upbutton.height("100%");
                    this.downbutton.height("100%");
                    this.downbutton.css("float", "left");
                    this.upbutton.css("float", "right");
                    this.upbutton.width(this.spinButtonsWidth);
                    this.downbutton.width(1 + this.spinButtonsWidth);
                }
                this._upArrow.height("100%");
                this._downArrow.height("100%");
                this.numberInput.css("width", g - 6);
                this.numberInput.css("margin-right", "2px");
            }
            var l = j / 2;
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) l = j / 4;
            this.numberInput.css("padding-left", "0px");
            this.numberInput.css("padding-right", "0px");
            this.numberInput.css("padding-top", Math.round(l) + "px");
            this.numberInput.css("padding-bottom", Math.round(l) + "px");
            if (void 0 == b || true == b) {
                this.numberInput.val(this._getString());
                if ("advanced" != this.inputMode) this._parseDecimalInSimpleMode();
            }
        },
        destroy: function() {
            this._removeHandlers();
            this.host.remove();
        },
        inputValue: function(a) {
            if (void 0 === a) return this._value();
            this.propertyChangedHandler(this, "value", this._value, a);
            this._refreshValue();
            return this;
        },
        _value: function() {
            var a = this.numberInput.val();
            return a;
        },
        val: function(a) {
            if (void 0 !== a && "object" != typeof a || null === a) if (null === a) {
                this.setDecimal(null);
                return;
            } else {
                var b = a;
                b = b.toString();
                if (b.indexOf(this.symbol) > -1) b = b.replace(this.symbol, "");
                var c = function(a, b, c) {
                    var d = a;
                    if (b == c) return a;
                    var e = d.indexOf(b);
                    while (e != -1) {
                        d = d.replace(b, c);
                        e = d.indexOf(b);
                    }
                    return d;
                };
                b = c(b, this.groupSeparator, "");
                b = b.replace(this.decimalSeparator, ".");
                var d = "";
                for (var e = 0; e < b.length; e++) {
                    var f = b.substring(e, e + 1);
                    if ("-" === f) d += "-";
                    if ("." === f) d += ".";
                    if (null != f.match(/^[0-9]+$/)) d += f;
                }
                b = d;
                b = b.replace(/ /g, "");
                b = new Number(b);
                this.setDecimal(b);
            } else return this.getDecimal();
        },
        getDecimal: function() {
            if (null == this.decimal) return null;
            if ("simple" == this.inputMode) {
                this._parseDecimalInSimpleMode(false);
                this.decimal = this._getDecimalInSimpleMode(this.decimal);
            }
            if ("" == this.decimal) return 0;
            var a = this.getvalue("negative");
            if (a && this.decimal > 0) return -parseFloat(this.decimal);
            return parseFloat(this.decimal);
        },
        setDecimal: function(a) {
            var b = a;
            if ("." != this.decimalSeparator) if (null === a) this._setDecimal(a); else {
                var c = a;
                if ("number" != typeof a) {
                    a = a.toString();
                    var d = a.indexOf(".");
                    if (d != -1) {
                        var e = a.substring(0, d);
                        var f = a.substring(d + 1);
                        c = e + "." + f;
                        if (e.indexOf("-") != -1) e = e.substring(1);
                        if ("advanced" != this.inputMode) a = e + "." + f; else a = e + this.decimalSeparator + f;
                    } else {
                        var d = a.indexOf(this.decimalSeparator);
                        if (d != -1) {
                            var e = a.substring(0, d);
                            var f = a.substring(d + 1);
                            c = e + "." + f;
                            if (e.indexOf("-") != -1) e = e.substring(1);
                            if ("advanced" != this.inputMode) a = e + "." + f; else a = e + this.decimalSeparator + f;
                        }
                    }
                }
                if (c < 0) this.setvalue("negative", true); else this.setvalue("negative", false);
                this._setDecimal(a);
            } else {
                if (a < 0) this.setvalue("negative", true); else this.setvalue("negative", false);
                if (null === a) this._setDecimal(a); else this._setDecimal(Math.abs(a));
            }
            if (null == b) this.numberInput.val("");
        },
        _setDecimal: function(a) {
            if (!this.allowNull && null == a) {
                this.decimal = 0;
                a = 0;
            }
            if (null == a) {
                this.decimal = null;
                this.value = null;
                this.clearDecimal();
                this._refreshValue();
                this.decimal = null;
                this.value = null;
                return;
            }
            if (a.toString().indexOf("e") != -1) a = new Number(a).toFixed(this.decimalDigits).toString();
            this.clearDecimal();
            var b = a.toString();
            var c = "";
            var d = "";
            var e = true;
            if (0 == b.length) b = "0";
            for (var f = 0; f < b.length; f++) {
                if ("number" == typeof a) {
                    if ("." == b.substring(f, f + 1)) {
                        e = false;
                        continue;
                    }
                } else if (b.substring(f, f + 1) == this.decimalSeparator) {
                    e = false;
                    continue;
                }
                if (e) c += b.substring(f, f + 1); else d += b.substring(f, f + 1);
            }
            if (c.length > 0) c = parseFloat(c).toString();
            var g = this.digits;
            if (g < c.length) c = c.substr(0, g);
            var h = 0;
            var i = this._getSeparatorPosition();
            var j = this._getHiddenPrefixCount();
            i += j;
            for (var f = i; f >= 0; f--) if (f < this.items.length && this.items[f].canEdit) if (h < c.length) {
                this.items[f].character = c.substring(c.length - h - 1, c.length - h);
                h++;
            }
            h = 0;
            for (var f = i; f < this.items.length; f++) if (this.items[f].canEdit) if (h < d.length) {
                this.items[f].character = d.substring(h, h + 1);
                h++;
            }
            this._refreshValue();
            if ("." == this.decimalSeparator) this.ValueString = new Number(a).toFixed(this.decimalDigits); else {
                var k = a.toString().indexOf(this.decimalSeparator);
                if (k > 0) {
                    var l = a.toString().substring(0, k);
                    var m = l + "." + a.toString().substring(k + 1);
                    this.ValueString = new Number(m).toFixed(this.decimalDigits);
                } else this.ValueString = new Number(a).toFixed(this.decimalDigits);
            }
            if ("advanced" != this.inputMode) {
                this._parseDecimalInSimpleMode();
                this._raiseEvent(1, this.ValueString);
            }
            if ("textbox" == this.inputMode) {
                this.decimal = this.ValueString;
                var n = this.getvalue("negative");
                if (n) this.decimal = "-" + this.ValueString;
            }
            var a = this.val();
            if (a < this.min || a > this.max) this.host.addClass("jqx-input-invalid"); else this.host.removeClass("jqx-input-invalid");
        },
        _getSeparatorPosition: function() {
            var a = this._getHiddenPrefixCount();
            if (this.decimalSeparatorPosition > 0) return this.decimalSeparatorPosition - a;
            return this.items.length - a;
        },
        _setTheme: function() {
            this.host.removeClass();
            this.host.addClass(this.toThemeProperty("jqx-input"));
            this.host.addClass(this.toThemeProperty("jqx-rc-all"));
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-widget-content"));
            this.host.addClass(this.toThemeProperty("jqx-numberinput"));
            if (this.spinButtons) {
                this.downbutton.removeClass();
                this.upbutton.removeClass();
                this.downbutton.addClass(this.toThemeProperty("jqx-scrollbar-button-state-normal"));
                this.upbutton.addClass(this.toThemeProperty("jqx-scrollbar-button-state-normal"));
                this._upArrow.removeClass();
                this._downArrow.removeClass();
                this._upArrow.addClass(this.toThemeProperty("jqx-icon-arrow-up"));
                this._downArrow.addClass(this.toThemeProperty("jqx-icon-arrow-down"));
            }
            this.numberInput.removeClass();
            this.numberInput.addClass(this.toThemeProperty("jqx-input-content"));
        },
        propertyChangedHandler: function(b, c, d, e) {
            if ("digits" == c || "groupSize" == c || "decimalDigits" == c) if (e < 0) throw new Exception(this.invalidArgumentExceptions[0]);
            if ("placeHolder" == c) b.numberInput.attr("placeholder", b.placeHolder);
            if ("theme" === c) a.jqx.utilities.setTheme(d, e, b.host);
            if ("digits" == c) if (e != d) b.digits = parseInt(e);
            if ("min" == c || "max" == c) {
                a.jqx.aria(b, "aria-value" + c, e.toString());
                b._refreshValue();
            }
            if ("decimalDigits" == c) if (e != d) b.decimalDigits = parseInt(e);
            if ("decimalSeparator" == c || "digits" == c || "symbol" == c || "symbolPosition" == c || "groupSize" == c || "groupSeparator" == c || "decimalDigits" == c || "negativeSymbol" == c) {
                var f = b.decimal;
                if ("decimalSeparator" == c && "" == e) e = " ";
                if (d != e) {
                    var g = b._selection();
                    b.items = new Array();
                    b._initializeLiterals();
                    b.value = b._getString();
                    b._refreshValue();
                    b._setDecimal(f);
                }
            }
            if ("rtl" == c) if (b.rtl) {
                if (b.spincontainer) {
                    b.spincontainer.css("float", "right");
                    b.spincontainer.css("border-right-width", "1px");
                }
                b.numberInput.css("float", "right");
            } else {
                if (b.spincontainer) {
                    b.spincontainer.css("float", "right");
                    b.spincontainer.css("border-right-width", "1px");
                }
                b.numberInput.css("float", "left");
            }
            if ("spinButtons" == c) if (b.spincontainer) {
                if (!e) b.spincontainer.css("display", "none"); else b.spincontainer.css("display", "block");
                b._render();
            } else b._spinButtons();
            if ("touchMode" === c) {
                b.inputMode = "textbox";
                b.spinMode = "simple";
                b.render();
            }
            if ("negative" == c && "advanced" == b.inputMode) {
                var g = b._selection();
                var h = 0;
                if (e) {
                    b.items[0].character = b.negativeSymbol[0];
                    h = 1;
                } else {
                    b.items[0].character = "";
                    h = -1;
                }
                b._refreshValue();
                if (b.isInitialized) b._setSelection(g.start + h, g.end + h);
            }
            if ("decimal" == c) {
                b.value = e;
                b.setDecimal(e);
            }
            if ("value" === c) {
                b.value = e;
                b.setDecimal(e);
                b._raiseEvent(1, e);
            }
            if ("textAlign" == c) {
                b.textAlign = e;
                b._render();
            }
            if ("disabled" == c) {
                b.numberInput.attr("disabled", e);
                if (b.disabled) b.host.addClass(b.toThemeProperty("jqx-fill-state-disabled")); else b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled"));
                a.jqx.aria(b, "aria-disabled", e.toString());
            }
            if ("readOnly" == c) b.readOnly = e;
            if ("promptChar" == c) {
                for (i = 0; i < b.items.length; i++) if (b.items[i].character == b.promptChar) b.items[i].character = e;
                b.promptChar = e;
            }
            if ("width" == c) {
                b.width = e;
                b._render();
            } else if ("height" == c) {
                b.height = e;
                b._render();
            }
        },
        _value: function() {
            var a = this.value;
            return a;
        },
        _refreshValue: function() {
            var a = this.value;
            var b = 0;
            if ("textbox" === this.inputMode) return;
            this.value = this._getString();
            a = this.value;
            var c = "";
            for (var d = 0; d < this.items.length; d++) {
                var e = this.items[d];
                if (e.canEdit && e.character != this.promptChar) c += e.character;
                if (d == this.decimalSeparatorPosition) c += ".";
            }
            this.decimal = c;
            var f = false;
            if (this.oldValue !== a) {
                this.oldValue = a;
                this._raiseEvent(0, a);
                f = true;
            }
            if ("simple" != this.inputMode) {
                this.numberInput.val(a);
                if (f) this._raiseEvent(1, a);
            }
            if (null == a) this.numberInput.val("");
        }
    });
}(jqxBaseFramework);