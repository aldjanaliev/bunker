"use strict";

var throttle = function throttle(func, ms) {
  var isThrottled = false,
      savedArgs,
      savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(function () {
      isThrottled = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

var isElement = function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
};

var getElementCoords = function getElementCoords(el) {
  var box = el.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.left + pageXOffset + box.width,
    bottom: box.top + pageYOffset + box.height,
    width: box.width,
    height: box.height
  };
};

var getSiblings = function getSiblings(el, selector) {
  return Array.prototype.slice.call(el.parentElement.children).filter(function (item) {
    if (item === el) return false;
    if (selector) return item.matches(selector);
    return true;
  });
};

var getScrollBarWidth = function getScrollBarWidth() {
  var width = 0;
  var d = document.createElement('div');
  d.style.overflow = 'scroll';
  document.body.appendChild(d);
  width = d.offsetWidth - d.clientWidth;
  d.remove();
  return width;
};

var Intersections = function Intersections() {
  var targets = [];

  var loadBackground = function loadBackground() {
    this.style.backgroundImage = "url(".concat(this.dataset.lazyBg, ")");
    this.classList.add('bg-loaded');
  };

  var intersectionHandler = function intersectionHandler(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (entry.target.hasAttribute('data-lazy-bg')) {
          loadBackground.call(entry.target);
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.add('in-viewport');
        }
      } else {
        if (entry.target.hasAttribute('data-static-visible')) {
          return;
        }

        entry.target.classList.remove('in-viewport');
      }
    });
  };

  var observer = new IntersectionObserver(intersectionHandler);
  return {
    get observer() {
      return observer;
    },

    get targets() {
      return targets;
    },

    set targets(newArray) {
      Array.prototype.splice.apply(targets, [targets.length, 0].concat(newArray));
      Array.prototype.forEach.call(newArray, function (item) {
        observer.observe(item);
      });
    }

  };
};

var generateEvent = function generateEvent(target, evt) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  target.dispatchEvent(new CustomEvent(evt, options));
};

var initTabs = function initTabs() {
  var TABLIST_CLASS = 'tablist';
  var CONTROL_CLASS = 'tab-btn';
  var ACTIVE_CONTROL_CLASS = 'tab-btn--active';
  var tablists = document.getElementsByClassName(TABLIST_CLASS);

  var isArrow = function isArrow(e) {
    return e.key === 'ArrowLeft' || e.key === 'ArrowRight';
  };

  Array.prototype.forEach.call(tablists, function (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('.' + CONTROL_CLASS));
    var activeTabIndex = tabs.indexOf(tabs.filter(function (tab) {
      return tab.classList.contains(ACTIVE_CONTROL_CLASS);
    })[0]);
    tablist.addEventListener('click', function (e) {
      if (!e.target.matches('.' + CONTROL_CLASS)) return;
      if (e.target.classList.contains(ACTIVE_CONTROL_CLASS)) return; // console.log(e)

      var prevActive = tablist.querySelector('.' + ACTIVE_CONTROL_CLASS);
      activeTabIndex = tabs.indexOf(e.target);

      if (prevActive) {
        prevActive.setAttribute('aria-selected', false);
        prevActive.setAttribute('tabindex', '-1');
        prevActive.classList.remove(ACTIVE_CONTROL_CLASS);

        var _relatedTab = document.getElementById(prevActive.getAttribute('aria-controls'));

        if (_relatedTab) {
          _relatedTab.setAttribute('hidden', true);
        }
      }

      e.target.classList.add(ACTIVE_CONTROL_CLASS);
      e.target.setAttribute('tabindex', 0);
      e.target.setAttribute('aria-selected', 'true');
      e.target.focus({
        preventScroll: true
      });
      var relatedTab = document.getElementById(e.target.getAttribute('aria-controls'));

      if (relatedTab) {
        relatedTab.removeAttribute('hidden');
        generateEvent(relatedTab, 'show', {
          bubbles: true
        });
      }
    });
    tablist.addEventListener('keydown', function (e) {
      if (!isArrow(e)) return;
      e.preventDefault();
      var controls = Array.prototype.slice.call(tablist.querySelectorAll('.' + CONTROL_CLASS));
      var activeIndex = controls.findIndex(function (control) {
        return control.classList.contains(ACTIVE_CONTROL_CLASS);
      });
      var nextControl = e.key === 'ArrowLeft' ? controls[activeIndex - 1] : controls[activeIndex + 1];
      if (nextControl) nextControl.click();
    });
  }); // galleries btn change

  var galleryTabs = document.querySelector('.galleries__tabpanels');
  var galleryBtn = document.querySelector('.galleries__btn');
  galleryTabs.addEventListener('show', function (e) {
    var text = document.getElementById(e.target.id.split('-')[0]).querySelector('span').innerText.toLowerCase();
    galleryBtn.dataset.title = e.target.dataset.modalTitle;
    galleryBtn.dataset.buttonText = "\u041F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 ".concat(text);
    galleryBtn.dataset.confirmModal = e.target.dataset.confirmModal;
    galleryBtn.dataset.typeId = e.target.dataset.typeId;
  });
};

var initSliders = function initSliders() {
  var options = {
    galleries: {
      type: 'carousel',
      focusAt: 'center',
      gap: 120,
      perView: 1,
      peek: 200,
      breakpoints: {
        899: {
          gap: 60,
          peek: 120
        },
        575: {
          gap: 10,
          peek: 10
        }
      }
    },
    pricing: {
      //focusAt: '1',
      rewind: false,
      perView: 3,
      gap: 30,
      breakpoints: {
        1023: {
          perView: 2
        },
        575: {
          perView: 1,
          gap: 5
        }
      }
    },
    areas: {
      rewind: false
    }
  };
  Array.prototype.forEach.call(document.querySelectorAll('.init-slider'), function (container) {
    var tabPanel = container.closest('.tabpanel');
    var opts = options[container.dataset.options] || {};
    var slider = new Glide(container, opts);
    var slides = container.querySelectorAll('.glide__slide');
    var track = container.querySelector('.glide__track');
    var controls = Array.prototype.slice.call(container.querySelectorAll('.glide__arrows, .glide__bullets'));

    var updateSliderBehaviour = function updateSliderBehaviour(e) {
      if (slider.settings.rewind) return;
      var perView = slider.settings.perView;

      if (slides.length <= perView) {
        track.style.display = 'flex';
        track.style.justifyContent = 'center';
        controls.forEach(function (control) {
          control.style.display = 'none';
        });
        slider.disable();
      } else {
        track.style.display = '';
        track.style.justifyContent = 'center';
        controls.forEach(function (control) {
          control.style.display = '';
        });
        slider.disabled = false;
      }
    };

    var checkOverflow = function checkOverflow(e) {
      if (slider.settings.rewind) return;
      var prevArrow = container.querySelector('[data-glide-dir="<"]');
      var nextArrow = container.querySelector('[data-glide-dir=">"]');

      var hideArrow = function hideArrow(arrow) {
        arrow.classList.add('glide__arrow--disabled');
        arrow.setAttribute('disabled', true);
      };

      var showArrow = function showArrow(arrow) {
        arrow.classList.remove('glide__arrow--disabled');
        arrow.removeAttribute('disabled');
      };

      if (prevArrow) {
        if (slider.index === 0) {
          hideArrow(prevArrow);
        } else {
          showArrow(prevArrow);
        }
      }

      if (nextArrow) {
        if (slider.index === slides.length - 1) {
          hideArrow(nextArrow);
        } else {
          showArrow(nextArrow);
        }
      }
    };

    slider.on(['build.after'], updateSliderBehaviour);
    slider.on(['mount.after', 'run'], checkOverflow);
    slider.mount();

    if (tabPanel) {
      tabPanel.addEventListener('show', function (e) {
        slider.update();
      });
    }
  });
  var recreationSliderBreakpoint = window.matchMedia('(max-width: 575px)');
  var recreationSlider = null;

  var recrSliderReinit = function recrSliderReinit() {
    if (recreationSliderBreakpoint.matches) {
      recreationSlider = new Glide('.recreation__slider', {
        type: 'carousel',
        perView: 1,
        gap: 10,
        peek: 15
      });
      recreationSlider.mount();
    } else {
      if (recreationSlider) {
        recreationSlider.destroy();
        recreationSlider = null;
      }
    }
  };

  recrSliderReinit();
  recreationSliderBreakpoint.addListener(recrSliderReinit);
};

var initChatsWidget = function initChatsWidget() {
  var EL_CLASS = 'chats';
  var EL_EXPANDED_CLASS = 'chats--expanded';
  var TRIGGER_CLASS = 'chats-trigger';
  var TIP_CLASS = 'chats__tip';
  var TIP_VISIBLE_CLASS = 'chats__tip--visible';
  var widget = {
    el: document.getElementsByClassName(EL_CLASS)[0],
    trigger: document.getElementsByClassName(TRIGGER_CLASS)[0],
    tip: document.getElementsByClassName(TIP_CLASS)[0],
    isOpen: function isOpen() {
      return this.el.classList.contains(EL_EXPANDED_CLASS);
    },
    open: function open() {
      this.el.classList.add(EL_EXPANDED_CLASS);
      this.trigger.setAttribute('aria-expanded', true);
      return this;
    },
    close: function close() {
      this.el.classList.remove(EL_EXPANDED_CLASS);
      this.trigger.setAttribute('aria-expanded', false);
      return this;
    },
    toggle: function toggle() {
      this.isOpen() ? this.close() : this.open();
      return this;
    },
    hide: function hide() {
      // this.el.style.opacity = 0;
      this.el.style.transform = 'translateY(200%)';
      return this;
    },
    show: function show() {
      // this.el.style.opacity = '';
      this.el.style.transform = '';
      return this;
    },
    showTip: function showTip() {
      this.tip.classList.add(TIP_VISIBLE_CLASS);
      return this;
    },
    hideTip: function hideTip() {
      this.tip.classList.remove(TIP_VISIBLE_CLASS);
      return this;
    },

    get position() {
      return this.el.getBoundingClientRect();
    }

  };
  setTimeout(function () {
    return widget.el.style.transition = 'all 0.5s ease';
  }, 100);
  var mobBreakpoint = window.matchMedia('(max-width: 575px)');
  var nextBlock = document.getElementById('areas');
  var TOP_OFFSET = 300;
  var nextBlockCoords = getElementCoords(nextBlock);
  widget.trigger.addEventListener('click', function () {
    return widget.toggle();
  });

  var toggleWidgetVisibilities = function toggleWidgetVisibilities(e) {
    if (mobBreakpoint.matches) {
      if (pageYOffset + TOP_OFFSET < document.documentElement.clientHeight) {
        widget.hide();
      } else {
        widget.show();
      }
    }

    if (pageYOffset + document.documentElement.clientHeight < nextBlockCoords.top + TOP_OFFSET || pageYOffset + document.documentElement.clientHeight > nextBlockCoords.top + nextBlockCoords.height) {
      widget.hideTip();
    } else {
      widget.showTip();
    }
  };

  toggleWidgetVisibilities();
  var throtted = throttle(toggleWidgetVisibilities, 100);
  window.addEventListener('scroll', throtted);
};

var initMobileNav = function initMobileNav() {
  var ELEMENT_CLASS = 'header-nav';
  var BURGER_CLASS = 'burger';
  var ELEMENT_MODIFIER = 'header-nav--open';
  var BURGER_MODIFIER = 'burger--close';
  var OPEN_TEXT = 'Открыть меню';
  var CLOSE_TEXT = 'Закрыть меню';
  var nav = {
    el: document.getElementsByClassName(ELEMENT_CLASS)[0],
    burger: document.getElementsByClassName(BURGER_CLASS)[0],

    get isOpen() {
      return this.el.classList.contains(ELEMENT_MODIFIER);
    },

    open: function open() {
      this.el.classList.add(ELEMENT_MODIFIER);
      this.burger.classList.add(BURGER_MODIFIER);
      this.burger.setAttribute('aria-expanded', true);
      this.burger.setAttribute('aria-label', CLOSE_TEXT);
      return this;
    },
    close: function close() {
      this.el.classList.remove(ELEMENT_MODIFIER);
      this.burger.classList.remove(BURGER_MODIFIER);
      this.burger.setAttribute('aria-expanded', false);
      this.burger.setAttribute('aria-label', OPEN_TEXT);
      return this;
    },
    toggle: function toggle() {
      this.isOpen ? this.close() : this.open();
      return this;
    }
  };
  document.addEventListener('click', function (e) {
    if (nav.burger.contains(e.target)) {
      nav.toggle();
    } else if (nav.isOpen) {
      if (!nav.el.contains(e.target) || e.target.tagName === 'A') {
        nav.close();
      }
    }
  });
};

var initTips = function initTips() {
  var triggers = document.querySelectorAll('[data-toggle="tooltip"]');
  Array.prototype.forEach.call(triggers, function (button) {
    var tooltip = document.querySelector(button.dataset.target);
    if (!tooltip) return console.error('No tooltip found');
    var popperInstance = null;

    function create() {
      popperInstance = Popper.createPopper(button, tooltip, {
        strategy: 'fixed',
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }]
      });
    }

    function destroy() {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    }

    function show() {
      tooltip.setAttribute('data-show', '');
      create();
    }

    function hide() {
      tooltip.removeAttribute('data-show');
      destroy();
    }

    var showEvents = ['mouseenter', 'focus'];
    var hideEvents = ['mouseleave', 'blur'];
    showEvents.forEach(function (event) {
      button.addEventListener(event, show);
    });
    hideEvents.forEach(function (event) {
      button.addEventListener(event, hide);
    });
  });
};

var initLightBoxes = function initLightBoxes() {
  GLightbox({
    selector: '.glightbox'
  });
};

var initApis = function initApis() {
  var loadApi = function loadApi() {
    if (this.id === 'reviews') {
      var vk = document.createElement('script');
      vk.setAttribute('async', true);
      vk.src = 'https://feedbackcloud.kupiapp.ru/widget/widget.js';
      vk.addEventListener('load', function () {
        feedback_vk.init({
          id: 'feedbackVk',
          gid: 197595569,
          count: 3
        });
      });
      document.body.appendChild(vk);
    }

    if (this.id === 'map') {
      console.log('loading');
      var ym = document.createElement('script');
      ym.setAttribute('async', true);
      ym.src = 'js/map.bundle.js';
      ym.addEventListener('load', function () {
        document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/map.bundle.css">');
        yaMapRoute.build('#mapContainer', {
          share: {
            telegram: 'tg://resolve?domain=okyolo',
            viber: 'viber://chat?number=+79966066077',
            whatsapp: 'https://api.whatsapp.com/send?phone=79966066077&text=getlocation'
          }
        });
      });
      document.body.appendChild(ym);
    }
  };

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      loadApi.call(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "".concat(window.innerHeight * 2, "px 0px")
  });
  Array.prototype.forEach.call(document.querySelectorAll('#reviews, #map'), function (container) {
    return observer.observe(container);
  });
};

var initDatePicker = function initDatePicker() {
  var inputDateElements = document.querySelectorAll('.type-date');
  if (!inputDateElements.length) return;
  Array.prototype.forEach.call(inputDateElements, function (el) {
    el.parentElement.insertAdjacentHTML('beforeend', "\n        <svg class=\"icon icon--date date-input-icon\" viewBox=\"0 0 128 128\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m121.693 14.088h-22.429v-7.781a1.75 1.75 0 0 0 -1.75-1.75h-7.462a1.749 1.749 0 0 0 -1.75 1.75v7.781h-18.821v-7.781a1.749 1.749 0 0 0 -1.75-1.75h-7.462a1.749 1.749 0 0 0 -1.75 1.75v7.781h-18.819v-7.781a1.749 1.749 0 0 0 -1.75-1.75h-7.464a1.75 1.75 0 0 0 -1.75 1.75v7.781h-22.429a1.749 1.749 0 0 0 -1.75 1.75v105.855a1.749 1.749 0 0 0 1.75 1.75h115.386a1.749 1.749 0 0 0 1.75-1.75v-105.855a1.749 1.749 0 0 0 -1.75-1.75zm-29.893-6.031h3.962v15.562h-3.962zm-29.783 0h3.962v15.562h-3.96zm-29.783 0h3.966v15.562h-3.964zm-24.177 9.531h20.679v7.781a1.75 1.75 0 0 0 1.75 1.75h7.462a1.749 1.749 0 0 0 1.75-1.75v-7.781h18.821v7.781a1.749 1.749 0 0 0 1.75 1.75h7.462a1.749 1.749 0 0 0 1.75-1.75v-7.781h18.819v7.781a1.749 1.749 0 0 0 1.75 1.75h7.462a1.75 1.75 0 0 0 1.75-1.75v-7.781h20.679v20.025h-111.884zm0 102.355v-78.83h111.886v78.83z\"/><path d=\"m27.66 49.015a8.033 8.033 0 1 0 8.033 8.033 8.041 8.041 0 0 0 -8.033-8.033zm0 12.566a4.533 4.533 0 1 1 4.533-4.533 4.537 4.537 0 0 1 -4.533 4.533z\"/><path d=\"m51.887 49.015a8.033 8.033 0 1 0 8.033 8.033 8.042 8.042 0 0 0 -8.033-8.033zm0 12.566a4.533 4.533 0 1 1 4.533-4.533 4.538 4.538 0 0 1 -4.533 4.533z\"/><path d=\"m76.113 49.015a8.033 8.033 0 1 0 8.033 8.033 8.042 8.042 0 0 0 -8.033-8.033zm0 12.566a4.533 4.533 0 1 1 4.533-4.533 4.537 4.537 0 0 1 -4.533 4.533z\"/><path d=\"m100.34 49.015a8.033 8.033 0 1 0 8.032 8.033 8.041 8.041 0 0 0 -8.032-8.033zm0 12.566a4.533 4.533 0 1 1 4.532-4.533 4.537 4.537 0 0 1 -4.532 4.533z\"/><path d=\"m27.66 72.5a8.034 8.034 0 1 0 8.033 8.033 8.042 8.042 0 0 0 -8.033-8.033zm0 12.567a4.534 4.534 0 1 1 4.533-4.534 4.538 4.538 0 0 1 -4.533 4.529z\"/><path d=\"m51.887 72.5a8.034 8.034 0 1 0 8.033 8.033 8.043 8.043 0 0 0 -8.033-8.033zm0 12.567a4.534 4.534 0 1 1 4.533-4.534 4.539 4.539 0 0 1 -4.533 4.529z\"/><path d=\"m76.113 72.5a8.034 8.034 0 1 0 8.033 8.033 8.043 8.043 0 0 0 -8.033-8.033zm0 12.567a4.534 4.534 0 1 1 4.533-4.534 4.538 4.538 0 0 1 -4.533 4.529z\"/><path d=\"m100.34 72.5a8.034 8.034 0 1 0 8.032 8.033 8.042 8.042 0 0 0 -8.032-8.033zm0 12.567a4.534 4.534 0 1 1 4.532-4.534 4.538 4.538 0 0 1 -4.532 4.529z\"/><path d=\"m27.66 95.976a8.033 8.033 0 1 0 8.033 8.033 8.041 8.041 0 0 0 -8.033-8.033zm0 12.566a4.533 4.533 0 1 1 4.533-4.533 4.537 4.537 0 0 1 -4.533 4.533z\"/><path d=\"m51.887 95.976a8.033 8.033 0 1 0 8.033 8.033 8.042 8.042 0 0 0 -8.033-8.033zm0 12.566a4.533 4.533 0 1 1 4.533-4.533 4.538 4.538 0 0 1 -4.533 4.533z\"/><path d=\"m76.113 95.976a8.033 8.033 0 1 0 8.033 8.033 8.042 8.042 0 0 0 -8.033-8.033zm0 12.566a4.533 4.533 0 1 1 4.533-4.533 4.537 4.537 0 0 1 -4.533 4.533z\"/><path d=\"m100.34 95.976a8.033 8.033 0 1 0 8.032 8.033 8.041 8.041 0 0 0 -8.032-8.033zm0 12.566a4.533 4.533 0 1 1 4.532-4.533 4.537 4.537 0 0 1 -4.532 4.533z\"/></svg>\n        ");
  });
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">');
  document.body.insertAdjacentHTML('beforeend', '<script src=""></script>');
  var script = document.createElement('script');
  script.setAttribute('defer', true);
  script.src = 'https://cdn.jsdelivr.net/npm/flatpickr';
  document.body.appendChild(script);
  var locale = document.createElement('script');
  locale.setAttribute('defer', true);
  locale.src = 'https://npmcdn.com/flatpickr/dist/l10n/ru.js';

  locale.onload = function () {
    flatpickr.localize(flatpickr.l10ns.ru);
    flatpickr('.type-date', {
      enableTime: false,
      dateFormat: 'd.m.Y',
      disableMobile: true
    });
  };

  document.body.appendChild(locale);
};

var initModals = function initModals(OPTIONS) {
  var customSlideHTML = "<div class=\"gslide\">\n        <div class=\"gslide-inner-content\">\n            <div class=\"ginner-container\">\n                <div class=\"gslide-media modal__container\">\n                    <button class=\"modal__close\" data-dissmis-glightbox aria-label=\"\u0417\u0430\u043A\u0440\u044B\u0442\u044C\" type=\"button\">\n                        <svg class=\"icon icon--close\">\n                            <use href=\"/img/icons.svg#close\" aria-hidden=\"true\"></use>\n                        </svg>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>";
  var glightBoxModal = GLightbox({
    // elements: [],
    closeButton: false,
    draggable: false,
    slideHtml: customSlideHTML
  });
  document.addEventListener('click', function (e) {
    var micromodalBtn = e.target.closest('[data-micromodal-trigger]');

    if (micromodalBtn) {
      var target = document.getElementById(micromodalBtn.dataset.micromodalTrigger);
      if (!target) return;
      MicroModal.show(micromodalBtn.dataset.micromodalTrigger, OPTIONS);
    }

    var glModalTrigger = e.target.closest('.glightbox-modal');

    if (glModalTrigger) {
      glightBoxModal.setElements([{
        content: document.querySelector(glModalTrigger.getAttribute('href')).cloneNode(true)
      }]);
      glightBoxModal.open();
    }

    if (e.target.matches('[data-dissmis-glightbox]')) {
      glightBoxModal.close();
    }
  });
};

var formSubmitHandle = function formSubmitHandle(MODAL_OPTIONS) {
  var resetForm = function resetForm(form) {
    var modal = form.closest('.modal');

    if (modal) {
      MicroModal.close(modal.id);
      form.reset();
    }

    if (form.hasAttribute('data-confirm-modal')) {
      setTimeout(function () {
        MicroModal.show(form.dataset.confirmModal, MODAL_OPTIONS, 300);
      });
    }
  };

  var submitHandler = function submitHandler(e) {
    var METHOD = 'POST';
    var URL = e.target.getAttribute('action');
    e.preventDefault();
    var form = e.target;
    var date = form.querySelector('.type-date');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    formData.append('visitor_uid', AMOPIXEL_IDENTIFIER.getVisitorUid());
    formData.append('user_origin', JSON.stringify({
      datetime: new Date(),
      referer: "https://leslos.chornenky.xyz"
    }));
    formData.append('form_id', form.dataset.id); // if date in exussr format

    if (date && date.value.length && date.value.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      formData.set(date.getAttribute('name'), date.value.split('.').reverse().join('-'));
    }

    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    xhr.open(METHOD, URL);
    xhr.send(formData);

    xhr.onload = function () {
      if (xhr.status != 200) {
        return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(xhr.status, ": ").concat(xhr.statusText));
      }

      console.log(xhr.response);
      form.style.opacity = '';
      form.style.pointerEvents = '';
      resetForm(form);
    };

    xhr.onerror = function () {
      alert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F");
    }; // setTimeout(() => {
    //     for (var key of formData.keys()) {
    //         form.style.opacity = '';
    //         form.style.pointerEvents = '';
    //         resetForm(form);
    //         console.log('key: ' + formData.get(key));
    //     }
    // }, 500);

  };

  document.addEventListener('submit', submitHandler);
};

var initMasking = function initMasking() {
  var REG = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  var isValid = function isValid(input) {
    return input.value.match(REG);
  };

  var setValues = function setValues(e) {
    if (e.target.type !== 'tel') return;
    if (isValid(e.target)) return;
    e.target.value = e.type === 'focus' ? '+7 (' : '';
  };

  Maska.create('.masked');
  document.addEventListener('focus', setValues, true);
  document.addEventListener('blur', setValues, true);
};

document.addEventListener('DOMContentLoaded', function () {
  var intersections = Intersections();
  intersections.targets = document.querySelectorAll('.intro__calc, [data-lazy-bg]');
  svg4everybody();
  initTabs();
  initSliders();
  initChatsWidget();
  initMobileNav();
  initTips();
  initLightBoxes();
  initApis();
  initDatePicker();
  initMasking();
  var MODAL_OPTIONS = {
    onShow: function onShow(modal, trigger) {
      if (trigger.hasAttribute('data-title')) {
        var dinamicTitle = modal.querySelector('.dinamic-title');
        dinamicTitle && (dinamicTitle.innerHTML = trigger.dataset.title);
        var formName = modal.querySelector('.form-name');
        formName && (formName.value = trigger.dataset.title);
      }

      if (trigger.hasAttribute('data-button-text')) {
        var submit = modal.querySelector('.dinamic-submit');
        submit && (submit.value = trigger.dataset.buttonText);
      }

      if (trigger.hasAttribute('data-booking-type')) {
        var typeControl = modal.querySelector('#bookingType');
        typeControl && (typeControl.value = trigger.dataset.bookingType);
      }

      if (trigger.hasAttribute('data-confirm-modal')) {
        var form = modal.querySelector('form');
        form && (form.dataset.confirmModal = trigger.dataset.confirmModal);
      }

      if (trigger.hasAttribute('data-type-id')) {
        var typeId = modal.querySelector('.event-type');
        typeId && (typeId.value = trigger.dataset.typeId);
      }

      document.body.style.paddingRight = getScrollBarWidth() + 'px';
    },
    onClose: function onClose(modal) {
      document.body.style.paddingRight = '';
    },
    openClass: 'modal--open',
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  };
  initModals(MODAL_OPTIONS);
  formSubmitHandle(MODAL_OPTIONS);
});