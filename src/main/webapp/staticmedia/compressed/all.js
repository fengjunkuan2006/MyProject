/*!
 * Bootstrap v3.0.3 (http://getbootstrap.com)
 * Copyright 2013 Twitter, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */

if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.3
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.3
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.3
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')
    var changed = true

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') === 'radio') {
        // see if clicking on current one
        if ($input.prop('checked') && this.$element.hasClass('active'))
          changed = false
        else
          $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.3
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.3
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.3
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.3
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.3
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.3
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.3
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.3
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);

/*
 * File:        jquery.dataTables.js
 * Version:     1.8.1
 * Description: Paginate, search and sort HTML tables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     28/3/2008
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     Mtaala
 * Contact:     allan.jardine@sprymedia.co.uk
 * 
 * Copyright 2008-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, as supplied with this software.
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 * 
 * For details please refer to: http://www.datatables.net
 */

/*
 * When considering jsLint, we need to allow eval() as it it is used for reading cookies
 */
/*jslint evil: true, undef: true, browser: true */
/*globals $, jQuery,_fnExternApiFunc,_fnInitalise,_fnInitComplete,_fnLanguageProcess,_fnAddColumn,_fnColumnOptions,_fnAddData,_fnCreateTr,_fnGatherData,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAjaxUpdate,_fnAjaxUpdateDraw,_fnAddOptionsHtml,_fnFeatureHtmlTable,_fnScrollDraw,_fnAjustColumnSizing,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnBuildSearchArray,_fnBuildSearchRow,_fnFilterCreateSearch,_fnDataToSearch,_fnSort,_fnSortAttachListener,_fnSortingClasses,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnFeatureHtmlLength,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnNodeToDataIndex,_fnVisbleColumns,_fnCalculateEnd,_fnConvertToWidth,_fnCalculateColumnWidths,_fnScrollingWidthAdjust,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnArrayCmp,_fnDetectType,_fnSettingsFromNode,_fnGetDataMaster,_fnGetTrNodes,_fnGetTdNodes,_fnEscapeRegex,_fnDeleteIndex,_fnReOrderIndex,_fnColumnOrdering,_fnLog,_fnClearTable,_fnSaveState,_fnLoadState,_fnCreateCookie,_fnReadCookie,_fnDetectHeader,_fnGetUniqueThs,_fnScrollBarWidth,_fnApplyToChildren,_fnMap,_fnGetRowData,_fnGetCellData,_fnSetCellData,_fnGetObjectDataFn,_fnSetObjectDataFn*/

(function($, window, document) {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Section - DataTables variables
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/*
	 * Variable: dataTableSettings
	 * Purpose:  Store the settings for each dataTables instance
	 * Scope:    jQuery.fn
	 */
	$.fn.dataTableSettings = [];
	var _aoSettings = $.fn.dataTableSettings; /* Short reference for fast internal lookup */
	
	/*
	 * Variable: dataTableExt
	 * Purpose:  Container for customisable parts of DataTables
	 * Scope:    jQuery.fn
	 */
	$.fn.dataTableExt = {};
	var _oExt = $.fn.dataTableExt;
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Section - DataTables extensible objects
	 * 
	 * The _oExt object is used to provide an area where user dfined plugins can be 
	 * added to DataTables. The following properties of the object are used:
	 *   oApi - Plug-in API functions
	 *   aTypes - Auto-detection of types
	 *   oSort - Sorting functions used by DataTables (based on the type)
	 *   oPagination - Pagination functions for different input styles
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/*
	 * Variable: sVersion
	 * Purpose:  Version string for plug-ins to check compatibility
	 * Scope:    jQuery.fn.dataTableExt
	 * Notes:    Allowed format is a.b.c.d.e where:
	 *   a:int, b:int, c:int, d:string(dev|beta), e:int. d and e are optional
	 */
	_oExt.sVersion = "1.8.1";
	
	/*
	 * Variable: sErrMode
	 * Purpose:  How should DataTables report an error. Can take the value 'alert' or 'throw'
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.sErrMode = "alert";
	
	/*
	 * Variable: iApiIndex
	 * Purpose:  Index for what 'this' index API functions should use
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.iApiIndex = 0;
	
	/*
	 * Variable: oApi
	 * Purpose:  Container for plugin API functions
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.oApi = { };
	
	/*
	 * Variable: aFiltering
	 * Purpose:  Container for plugin filtering functions
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.afnFiltering = [ ];
	
	/*
	 * Variable: aoFeatures
	 * Purpose:  Container for plugin function functions
	 * Scope:    jQuery.fn.dataTableExt
	 * Notes:    Array of objects with the following parameters:
	 *   fnInit: Function for initialisation of Feature. Takes oSettings and returns node
	 *   cFeature: Character that will be matched in sDom - case sensitive
	 *   sFeature: Feature name - just for completeness :-)
	 */
	_oExt.aoFeatures = [ ];
	
	/*
	 * Variable: ofnSearch
	 * Purpose:  Container for custom filtering functions
	 * Scope:    jQuery.fn.dataTableExt
	 * Notes:    This is an object (the name should match the type) for custom filtering function,
	 *   which can be used for live DOM checking or formatted text filtering
	 */
	_oExt.ofnSearch = { };
	
	/*
	 * Variable: afnSortData
	 * Purpose:  Container for custom sorting data source functions
	 * Scope:    jQuery.fn.dataTableExt
	 * Notes:    Array (associative) of functions which is run prior to a column of this 
	 *   'SortDataType' being sorted upon.
	 *   Function input parameters:
	 *     object:oSettings-  DataTables settings object
	 *     int:iColumn - Target column number
	 *   Return value: Array of data which exactly matched the full data set size for the column to
	 *     be sorted upon
	 */
	_oExt.afnSortData = [ ];
	
	/*
	 * Variable: oStdClasses
	 * Purpose:  Storage for the various classes that DataTables uses
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.oStdClasses = {
		/* Two buttons buttons */
		"sPagePrevEnabled": "paginate_enabled_previous",
		"sPagePrevDisabled": "paginate_disabled_previous",
		"sPageNextEnabled": "paginate_enabled_next",
		"sPageNextDisabled": "paginate_disabled_next",
		"sPageJUINext": "",
		"sPageJUIPrev": "",
		
		/* Full numbers paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "paginate_active",
		"sPageButtonStaticDisabled": "paginate_button paginate_button_disabled",
		"sPageFirst": "first",
		"sPagePrevious": "previous",
		"sPageNext": "next",
		"sPageLast": "last",
		
		/* Stripping classes */
		"sStripOdd": "odd",
		"sStripEven": "even",
		
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
		
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
		
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
		
		/* Misc */
		"sFooterTH": ""
	};
	
	/*
	 * Variable: oJUIClasses
	 * Purpose:  Storage for the various classes that DataTables uses - jQuery UI suitable
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.oJUIClasses = {
		/* Two buttons buttons */
		"sPagePrevEnabled": "fg-button ui-button ui-state-default ui-corner-left",
		"sPagePrevDisabled": "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
		"sPageNextEnabled": "fg-button ui-button ui-state-default ui-corner-right",
		"sPageNextDisabled": "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
		"sPageJUINext": "ui-icon ui-icon-circle-arrow-e",
		"sPageJUIPrev": "ui-icon ui-icon-circle-arrow-w",
		
		/* Full numbers paging buttons */
		"sPageButton": "fg-button ui-button ui-state-default",
		"sPageButtonActive": "fg-button ui-button ui-state-default ui-state-disabled",
		"sPageButtonStaticDisabled": "fg-button ui-button ui-state-default ui-state-disabled",
		"sPageFirst": "first ui-corner-tl ui-corner-bl",
		"sPagePrevious": "previous",
		"sPageNext": "next",
		"sPageLast": "last ui-corner-tr ui-corner-br",
		
		/* Stripping classes */
		"sStripOdd": "odd",
		"sStripEven": "even",
		
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
		
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi "+
			"ui-buttonset-multi paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
		
		/* Sorting */
		"sSortAsc": "ui-state-default",
		"sSortDesc": "ui-state-default",
		"sSortable": "ui-state-default",
		"sSortableAsc": "ui-state-default",
		"sSortableDesc": "ui-state-default",
		"sSortableNone": "ui-state-default",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
		"sSortJUIAsc": "css_right ui-icon ui-icon-triangle-1-n",
		"sSortJUIDesc": "css_right ui-icon ui-icon-triangle-1-s",
		"sSortJUI": "css_right ui-icon ui-icon-carat-2-n-s",
		"sSortJUIAscAllowed": "css_right ui-icon ui-icon-carat-1-n",
		"sSortJUIDescAllowed": "css_right ui-icon ui-icon-carat-1-s",
		"sSortJUIWrapper": "DataTables_sort_wrapper",
		"sSortIcon": "DataTables_sort_icon",
		
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead ui-state-default",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot ui-state-default",
		"sScrollFootInner": "dataTables_scrollFootInner",
		
		/* Misc */
		"sFooterTH": "ui-state-default"
	};
	
	/*
	 * Variable: oPagination
	 * Purpose:  Container for the various type of pagination that dataTables supports
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt.oPagination = {
		/*
		 * Variable: two_button
		 * Purpose:  Standard two button (forward/back) pagination
		 * Scope:    jQuery.fn.dataTableExt.oPagination
		 */
		"two_button": {
			/*
			 * Function: oPagination.two_button.fnInit
			 * Purpose:  Initalise dom elements required for pagination with forward/back buttons only
			 * Returns:  -
			 * Inputs:   object:oSettings - dataTables settings object
			 *           node:nPaging - the DIV which contains this pagination control
			 *           function:fnCallbackDraw - draw function which must be called on update
			 */
			"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
			{
				var nPrevious, nNext, nPreviousInner, nNextInner;
				
				/* Store the next and previous elements in the oSettings object as they can be very
				 * usful for automation - particularly testing
				 */
				if ( !oSettings.bJUI )
				{
					nPrevious = document.createElement( 'div' );
					nNext = document.createElement( 'div' );
				}
				else
				{
					nPrevious = document.createElement( 'a' );
					nNext = document.createElement( 'a' );
					
					nNextInner = document.createElement('span');
					nNextInner.className = oSettings.oClasses.sPageJUINext;
					nNext.appendChild( nNextInner );
					
					nPreviousInner = document.createElement('span');
					nPreviousInner.className = oSettings.oClasses.sPageJUIPrev;
					nPrevious.appendChild( nPreviousInner );
				}
				
				nPrevious.className = oSettings.oClasses.sPagePrevDisabled;
				nNext.className = oSettings.oClasses.sPageNextDisabled;
				
				nPrevious.title = oSettings.oLanguage.oPaginate.sPrevious;
				nNext.title = oSettings.oLanguage.oPaginate.sNext;
				
				nPaging.appendChild( nPrevious );
				nPaging.appendChild( nNext );
				
				$(nPrevious).bind( 'click.DT', function() {
					if ( oSettings.oApi._fnPageChange( oSettings, "previous" ) )
					{
						/* Only draw when the page has actually changed */
						fnCallbackDraw( oSettings );
					}
				} );
				
				$(nNext).bind( 'click.DT', function() {
					if ( oSettings.oApi._fnPageChange( oSettings, "next" ) )
					{
						fnCallbackDraw( oSettings );
					}
				} );
				
				/* Take the brutal approach to cancelling text selection */
				$(nPrevious).bind( 'selectstart.DT', function () { return false; } );
				$(nNext).bind( 'selectstart.DT', function () { return false; } );
				
				/* ID the first elements only */
				if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.p == "undefined" )
				{
					nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
					nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
					nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
				}
			},
			
			/*
			 * Function: oPagination.two_button.fnUpdate
			 * Purpose:  Update the two button pagination at the end of the draw
			 * Returns:  -
			 * Inputs:   object:oSettings - dataTables settings object
			 *           function:fnCallbackDraw - draw function to call on page change
			 */
			"fnUpdate": function ( oSettings, fnCallbackDraw )
			{
				if ( !oSettings.aanFeatures.p )
				{
					return;
				}
				
				/* Loop over each instance of the pager */
				var an = oSettings.aanFeatures.p;
				for ( var i=0, iLen=an.length ; i<iLen ; i++ )
				{
					if ( an[i].childNodes.length !== 0 )
					{
						an[i].childNodes[0].className = 
							( oSettings._iDisplayStart === 0 ) ? 
							oSettings.oClasses.sPagePrevDisabled : oSettings.oClasses.sPagePrevEnabled;
						
						an[i].childNodes[1].className = 
							( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() ) ? 
							oSettings.oClasses.sPageNextDisabled : oSettings.oClasses.sPageNextEnabled;
					}
				}
			}
		},
		
		
		/*
		 * Variable: iFullNumbersShowPages
		 * Purpose:  Change the number of pages which can be seen
		 * Scope:    jQuery.fn.dataTableExt.oPagination
		 */
		"iFullNumbersShowPages": 5,
		
		/*
		 * Variable: full_numbers
		 * Purpose:  Full numbers pagination
		 * Scope:    jQuery.fn.dataTableExt.oPagination
		 */
		"full_numbers": {
			/*
			 * Function: oPagination.full_numbers.fnInit
			 * Purpose:  Initalise dom elements required for pagination with a list of the pages
			 * Returns:  -
			 * Inputs:   object:oSettings - dataTables settings object
			 *           node:nPaging - the DIV which contains this pagination control
			 *           function:fnCallbackDraw - draw function which must be called on update
			 */
			"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
			{
				var nFirst = document.createElement( 'span' );
				var nPrevious = document.createElement( 'span' );
				var nList = document.createElement( 'span' );
				var nNext = document.createElement( 'span' );
				var nLast = document.createElement( 'span' );
				
				nFirst.innerHTML = oSettings.oLanguage.oPaginate.sFirst;
				nPrevious.innerHTML = oSettings.oLanguage.oPaginate.sPrevious;
				nNext.innerHTML = oSettings.oLanguage.oPaginate.sNext;
				nLast.innerHTML = oSettings.oLanguage.oPaginate.sLast;
				
				var oClasses = oSettings.oClasses;
				nFirst.className = oClasses.sPageButton+" "+oClasses.sPageFirst;
				nPrevious.className = oClasses.sPageButton+" "+oClasses.sPagePrevious;
				nNext.className= oClasses.sPageButton+" "+oClasses.sPageNext;
				nLast.className = oClasses.sPageButton+" "+oClasses.sPageLast;
				
				nPaging.appendChild( nFirst );
				nPaging.appendChild( nPrevious );
				nPaging.appendChild( nList );
				nPaging.appendChild( nNext );
				nPaging.appendChild( nLast );
				
				$(nFirst).bind( 'click.DT', function () {
					if ( oSettings.oApi._fnPageChange( oSettings, "first" ) )
					{
						fnCallbackDraw( oSettings );
					}
				} );
				
				$(nPrevious).bind( 'click.DT', function() {
					if ( oSettings.oApi._fnPageChange( oSettings, "previous" ) )
					{
						fnCallbackDraw( oSettings );
					}
				} );
				
				$(nNext).bind( 'click.DT', function() {
					if ( oSettings.oApi._fnPageChange( oSettings, "next" ) )
					{
						fnCallbackDraw( oSettings );
					}
				} );
				
				$(nLast).bind( 'click.DT', function() {
					if ( oSettings.oApi._fnPageChange( oSettings, "last" ) )
					{
						fnCallbackDraw( oSettings );
					}
				} );
				
				/* Take the brutal approach to cancelling text selection */
				$('span', nPaging)
					.bind( 'mousedown.DT', function () { return false; } )
					.bind( 'selectstart.DT', function () { return false; } );
				
				/* ID the first elements only */
				if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.p == "undefined" )
				{
					nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
					nFirst.setAttribute( 'id', oSettings.sTableId+'_first' );
					nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
					nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
					nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
				}
			},
			
			/*
			 * Function: oPagination.full_numbers.fnUpdate
			 * Purpose:  Update the list of page buttons shows
			 * Returns:  -
			 * Inputs:   object:oSettings - dataTables settings object
			 *           function:fnCallbackDraw - draw function to call on page change
			 */
			"fnUpdate": function ( oSettings, fnCallbackDraw )
			{
				if ( !oSettings.aanFeatures.p )
				{
					return;
				}
				
				var iPageCount = _oExt.oPagination.iFullNumbersShowPages;
				var iPageCountHalf = Math.floor(iPageCount / 2);
				var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
				var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
				var sList = "";
				var iStartButton, iEndButton, i, iLen;
				var oClasses = oSettings.oClasses;
				
				/* Pages calculation */
				if (iPages < iPageCount)
				{
					iStartButton = 1;
					iEndButton = iPages;
				}
				else
				{
					if (iCurrentPage <= iPageCountHalf)
					{
						iStartButton = 1;
						iEndButton = iPageCount;
					}
					else
					{
						if (iCurrentPage >= (iPages - iPageCountHalf))
						{
							iStartButton = iPages - iPageCount + 1;
							iEndButton = iPages;
						}
						else
						{
							iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1;
							iEndButton = iStartButton + iPageCount - 1;
						}
					}
				}
				
				/* Build the dynamic list */
				for ( i=iStartButton ; i<=iEndButton ; i++ )
				{
					if ( iCurrentPage != i )
					{
						sList += '<span class="'+oClasses.sPageButton+'">'+i+'</span>';
					}
					else
					{
						sList += '<span class="'+oClasses.sPageButtonActive+'">'+i+'</span>';
					}
				}
				
				/* Loop over each instance of the pager */
				var an = oSettings.aanFeatures.p;
				var anButtons, anStatic, nPaginateList;
				var fnClick = function(e) {
					/* Use the information in the element to jump to the required page */
					var iTarget = (this.innerHTML * 1) - 1;
					oSettings._iDisplayStart = iTarget * oSettings._iDisplayLength;
					fnCallbackDraw( oSettings );
					e.preventDefault();
				};
				var fnFalse = function () { return false; };
				
				for ( i=0, iLen=an.length ; i<iLen ; i++ )
				{
					if ( an[i].childNodes.length === 0 )
					{
						continue;
					}
					
					/* Build up the dynamic list forst - html and listeners */
					var qjPaginateList = $('span:eq(2)', an[i]);
					qjPaginateList.html( sList );
					$('span', qjPaginateList).bind( 'click.DT', fnClick ).bind( 'mousedown.DT', fnFalse )
						.bind( 'selectstart.DT', fnFalse );
					
					/* Update the 'premanent botton's classes */
					anButtons = an[i].getElementsByTagName('span');
					anStatic = [
						anButtons[0], anButtons[1], 
						anButtons[anButtons.length-2], anButtons[anButtons.length-1]
					];
					$(anStatic).removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled );
					if ( iCurrentPage == 1 )
					{
						anStatic[0].className += " "+oClasses.sPageButtonStaticDisabled;
						anStatic[1].className += " "+oClasses.sPageButtonStaticDisabled;
					}
					else
					{
						anStatic[0].className += " "+oClasses.sPageButton;
						anStatic[1].className += " "+oClasses.sPageButton;
					}
					
					if ( iPages === 0 || iCurrentPage == iPages || oSettings._iDisplayLength == -1 )
					{
						anStatic[2].className += " "+oClasses.sPageButtonStaticDisabled;
						anStatic[3].className += " "+oClasses.sPageButtonStaticDisabled;
					}
					else
					{
						anStatic[2].className += " "+oClasses.sPageButton;
						anStatic[3].className += " "+oClasses.sPageButton;
					}
				}
			}
		}
	};
	
	/*
	 * Variable: oSort
	 * Purpose:  Wrapper for the sorting functions that can be used in DataTables
	 * Scope:    jQuery.fn.dataTableExt
	 * Notes:    The functions provided in this object are basically standard javascript sort
	 *   functions - they expect two inputs which they then compare and then return a priority
	 *   result. For each sort method added, two functions need to be defined, an ascending sort and
	 *   a descending sort.
	 */
	_oExt.oSort = {
		/*
		 * text sorting
		 */
		"string-asc": function ( a, b )
		{
			if ( typeof a != 'string' ) { a = ''; }
			if ( typeof b != 'string' ) { b = ''; }
			var x = a.toLowerCase();
			var y = b.toLowerCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
		
		"string-desc": function ( a, b )
		{
			if ( typeof a != 'string' ) { a = ''; }
			if ( typeof b != 'string' ) { b = ''; }
			var x = a.toLowerCase();
			var y = b.toLowerCase();
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		},
		
		
		/*
		 * html sorting (ignore html tags)
		 */
		"html-asc": function ( a, b )
		{
			var x = a.replace( /<.*?>/g, "" ).toLowerCase();
			var y = b.replace( /<.*?>/g, "" ).toLowerCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
		
		"html-desc": function ( a, b )
		{
			var x = a.replace( /<.*?>/g, "" ).toLowerCase();
			var y = b.replace( /<.*?>/g, "" ).toLowerCase();
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		},
		
		
		/*
		 * date sorting
		 */
		"date-asc": function ( a, b )
		{
			var x = Date.parse( a );
			var y = Date.parse( b );
			
			if ( isNaN(x) || x==="" )
			{
			x = Date.parse( "01/01/1970 00:00:00" );
			}
			if ( isNaN(y) || y==="" )
			{
				y =	Date.parse( "01/01/1970 00:00:00" );
			}
			
			return x - y;
		},
		
		"date-desc": function ( a, b )
		{
			var x = Date.parse( a );
			var y = Date.parse( b );
			
			if ( isNaN(x) || x==="" )
			{
			x = Date.parse( "01/01/1970 00:00:00" );
			}
			if ( isNaN(y) || y==="" )
			{
				y =	Date.parse( "01/01/1970 00:00:00" );
			}
			
			return y - x;
		},
		
		
		/*
		 * numerical sorting
		 */
		"numeric-asc": function ( a, b )
		{
			var x = (a=="-" || a==="") ? 0 : a*1;
			var y = (b=="-" || b==="") ? 0 : b*1;
			return x - y;
		},
		
		"numeric-desc": function ( a, b )
		{
			var x = (a=="-" || a==="") ? 0 : a*1;
			var y = (b=="-" || b==="") ? 0 : b*1;
			return y - x;
		}
	};
	
	
	/*
	 * Variable: aTypes
	 * Purpose:  Container for the various type of type detection that dataTables supports
	 * Scope:    jQuery.fn.dataTableExt
	 * Notes:    The functions in this array are expected to parse a string to see if it is a data
	 *   type that it recognises. If so then the function should return the name of the type (a
	 *   corresponding sort function should be defined!), if the type is not recognised then the
	 *   function should return null such that the parser and move on to check the next type.
	 *   Note that ordering is important in this array - the functions are processed linearly,
	 *   starting at index 0.
	 *   Note that the input for these functions is always a string! It cannot be any other data
	 *   type
	 */
	_oExt.aTypes = [
		/*
		 * Function: -
		 * Purpose:  Check to see if a string is numeric
		 * Returns:  string:'numeric' or null
		 * Inputs:   mixed:sText - string to check
		 */
		function ( sData )
		{
			/* Allow zero length strings as a number */
			if ( typeof sData == 'number' )
			{
				return 'numeric';
			}
			else if ( typeof sData != 'string' )
			{
				return null;
			}
			
			var sValidFirstChars = "0123456789-";
			var sValidChars = "0123456789.";
			var Char;
			var bDecimal = false;
			
			/* Check for a valid first char (no period and allow negatives) */
			Char = sData.charAt(0); 
			if (sValidFirstChars.indexOf(Char) == -1) 
			{
				return null;
			}
			
			/* Check all the other characters are valid */
			for ( var i=1 ; i<sData.length ; i++ ) 
			{
				Char = sData.charAt(i); 
				if (sValidChars.indexOf(Char) == -1) 
				{
					return null;
				}
				
				/* Only allowed one decimal place... */
				if ( Char == "." )
				{
					if ( bDecimal )
					{
						return null;
					}
					bDecimal = true;
				}
			}
			
			return 'numeric';
		},
		
		/*
		 * Function: -
		 * Purpose:  Check to see if a string is actually a formatted date
		 * Returns:  string:'date' or null
		 * Inputs:   string:sText - string to check
		 */
		function ( sData )
		{
			var iParse = Date.parse(sData);
			if ( (iParse !== null && !isNaN(iParse)) || (typeof sData == 'string' && sData.length === 0) )
			{
				return 'date';
			}
			return null;
		},
		
		/*
		 * Function: -
		 * Purpose:  Check to see if a string should be treated as an HTML string
		 * Returns:  string:'html' or null
		 * Inputs:   string:sText - string to check
		 */
		function ( sData )
		{
			if ( typeof sData == 'string' && sData.indexOf('<') != -1 && sData.indexOf('>') != -1 )
			{
				return 'html';
			}
			return null;
		}
	];
	
	/*
	 * Function: fnVersionCheck
	 * Purpose:  Check a version string against this version of DataTables. Useful for plug-ins
	 * Returns:  bool:true -this version of DataTables is greater or equal to the required version
	 *                false -this version of DataTales is not suitable
	 * Inputs:   string:sVersion - the version to check against. May be in the following formats:
	 *             "a", "a.b" or "a.b.c"
	 * Notes:    This function will only check the first three parts of a version string. It is
	 *   assumed that beta and dev versions will meet the requirements. This might change in future
	 */
	_oExt.fnVersionCheck = function( sVersion )
	{
		/* This is cheap, but very effective */
		var fnZPad = function (Zpad, count)
		{
			while(Zpad.length < count) {
				Zpad += '0';
			}
			return Zpad;
		};
		var aThis = _oExt.sVersion.split('.');
		var aThat = sVersion.split('.');
		var sThis = '', sThat = '';
		
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ )
		{
			sThis += fnZPad( aThis[i], 3 );
			sThat += fnZPad( aThat[i], 3 );
		}
		
		return parseInt(sThis, 10) >= parseInt(sThat, 10);
	};
	
	/*
	 * Variable: _oExternConfig
	 * Purpose:  Store information for DataTables to access globally about other instances
	 * Scope:    jQuery.fn.dataTableExt
	 */
	_oExt._oExternConfig = {
		/* int:iNextUnique - next unique number for an instance */
		"iNextUnique": 0
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Section - DataTables prototype
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/*
	 * Function: dataTable
	 * Purpose:  DataTables information
	 * Returns:  -
	 * Inputs:   object:oInit - initalisation options for the table
	 */
	$.fn.dataTable = function( oInit )
	{
		/*
		 * Function: classSettings
		 * Purpose:  Settings container function for all 'class' properties which are required
		 *   by dataTables
		 * Returns:  -
		 * Inputs:   -
		 */
		function classSettings ()
		{
			this.fnRecordsTotal = function ()
			{
				if ( this.oFeatures.bServerSide ) {
					return parseInt(this._iRecordsTotal, 10);
				} else {
					return this.aiDisplayMaster.length;
				}
			};
			
			this.fnRecordsDisplay = function ()
			{
				if ( this.oFeatures.bServerSide ) {
					return parseInt(this._iRecordsDisplay, 10);
				} else {
					return this.aiDisplay.length;
				}
			};
			
			this.fnDisplayEnd = function ()
			{
				if ( this.oFeatures.bServerSide ) {
					if ( this.oFeatures.bPaginate === false || this._iDisplayLength == -1 ) {
						return this._iDisplayStart+this.aiDisplay.length;
					} else {
						return Math.min( this._iDisplayStart+this._iDisplayLength, 
							this._iRecordsDisplay );
					}
				} else {
					return this._iDisplayEnd;
				}
			};
			
			/*
			 * Variable: oInstance
			 * Purpose:  The DataTables object for this table
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.oInstance = null;
			
			/*
			 * Variable: sInstance
			 * Purpose:  Unique idendifier for each instance of the DataTables object
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.sInstance = null;
			
			/*
			 * Variable: oFeatures
			 * Purpose:  Indicate the enablement of key dataTable features
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.oFeatures = {
				"bPaginate": true,
				"bLengthChange": true,
				"bFilter": true,
				"bSort": true,
				"bInfo": true,
				"bAutoWidth": true,
				"bProcessing": false,
				"bSortClasses": true,
				"bStateSave": false,
				"bServerSide": false,
				"bDeferRender": false
			};
			
			/*
			 * Variable: oScroll
			 * Purpose:  Container for scrolling options
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.oScroll = {
				"sX": "",
				"sXInner": "",
				"sY": "",
				"bCollapse": false,
				"bInfinite": false,
				"iLoadGap": 100,
				"iBarWidth": 0,
				"bAutoCss": true
			};
			
			/*
			 * Variable: aanFeatures
			 * Purpose:  Array referencing the nodes which are used for the features
			 * Scope:    jQuery.dataTable.classSettings 
			 * Notes:    The parameters of this object match what is allowed by sDom - i.e.
			 *   'l' - Length changing
			 *   'f' - Filtering input
			 *   't' - The table!
			 *   'i' - Information
			 *   'p' - Pagination
			 *   'r' - pRocessing
			 */
			this.aanFeatures = [];
			
			/*
			 * Variable: oLanguage
			 * Purpose:  Store the language strings used by dataTables
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    The words in the format _VAR_ are variables which are dynamically replaced
			 *   by javascript
			 */
			this.oLanguage = {
				"sProcessing": "Processing...",
				"sLengthMenu": "Show _MENU_ entries",
				"sZeroRecords": "No matching records found",
				"sEmptyTable": "No data available in table",
				"sLoadingRecords": "Loading...",
				"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
				"sInfoEmpty": "Showing 0 to 0 of 0 entries",
				"sInfoFiltered": "(filtered from _MAX_ total entries)",
				"sInfoPostFix": "",
				"sSearch": "Search:",
				"sUrl": "",
				"oPaginate": {
					"sFirst":    "First",
					"sPrevious": "Previous",
					"sNext":     "Next",
					"sLast":     "Last"
				},
				"fnInfoCallback": null
			};
			
			/*
			 * Variable: aoData
			 * Purpose:  Store data information
			 * Scope:    jQuery.dataTable.classSettings 
			 * Notes:    This is an array of objects with the following parameters:
			 *   int: _iId - internal id for tracking
			 *   array: _aData - internal data - used for sorting / filtering etc
			 *   node: nTr - display node
			 *   array node: _anHidden - hidden TD nodes
			 *   string: _sRowStripe
			 */
			this.aoData = [];
			
			/*
			 * Variable: aiDisplay
			 * Purpose:  Array of indexes which are in the current display (after filtering etc)
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.aiDisplay = [];
			
			/*
			 * Variable: aiDisplayMaster
			 * Purpose:  Array of indexes for display - no filtering
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.aiDisplayMaster = [];
							
			/*
			 * Variable: aoColumns
			 * Purpose:  Store information about each column that is in use
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.aoColumns = [];
							
			/*
			 * Variable: aoHeader
			 * Purpose:  Store information about the table's header
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.aoHeader = [];
							
			/*
			 * Variable: aoFooter
			 * Purpose:  Store information about the table's footer
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.aoFooter = [];
			
			/*
			 * Variable: iNextId
			 * Purpose:  Store the next unique id to be used for a new row
			 * Scope:    jQuery.dataTable.classSettings 
			 */
			this.iNextId = 0;
			
			/*
			 * Variable: asDataSearch
			 * Purpose:  Search data array for regular expression searching
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.asDataSearch = [];
			
			/*
			 * Variable: oPreviousSearch
			 * Purpose:  Store the previous search incase we want to force a re-search
			 *   or compare the old search to a new one
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.oPreviousSearch = {
				"sSearch": "",
				"bRegex": false,
				"bSmart": true
			};
			
			/*
			 * Variable: aoPreSearchCols
			 * Purpose:  Store the previous search for each column
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.aoPreSearchCols = [];
			
			/*
			 * Variable: aaSorting
			 * Purpose:  Sorting information
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    Index 0 - column number
			 *           Index 1 - current sorting direction
			 *           Index 2 - index of asSorting for this column
			 */
			this.aaSorting = [ [0, 'asc', 0] ];
			
			/*
			 * Variable: aaSortingFixed
			 * Purpose:  Sorting information that is always applied
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.aaSortingFixed = null;
			
			/*
			 * Variable: asStripClasses
			 * Purpose:  Classes to use for the striping of a table
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.asStripClasses = [];
			
			/*
			 * Variable: asDestoryStrips
			 * Purpose:  If restoring a table - we should restore it's striping classes as well
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.asDestoryStrips = [];
			
			/*
			 * Variable: sDestroyWidth
			 * Purpose:  If restoring a table - we should restore it's width
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.sDestroyWidth = 0;
			
			/*
			 * Variable: fnRowCallback
			 * Purpose:  Call this function every time a row is inserted (draw)
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnRowCallback = null;
			
			/*
			 * Variable: fnHeaderCallback
			 * Purpose:  Callback function for the header on each draw
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnHeaderCallback = null;
			
			/*
			 * Variable: fnFooterCallback
			 * Purpose:  Callback function for the footer on each draw
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnFooterCallback = null;
			
			/*
			 * Variable: aoDrawCallback
			 * Purpose:  Array of callback functions for draw callback functions
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    Each array element is an object with the following parameters:
			 *   function:fn - function to call
			 *   string:sName - name callback (feature). useful for arranging array
			 */
			this.aoDrawCallback = [];
			
			/*
			 * Variable: fnPreDrawCallback
			 * Purpose:  Callback function for just before the table is redrawn. A return of false
			 *           will be used to cancel the draw.
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnPreDrawCallback = null;
			
			/*
			 * Variable: fnInitComplete
			 * Purpose:  Callback function for when the table has been initalised
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnInitComplete = null;
			
			/*
			 * Variable: sTableId
			 * Purpose:  Cache the table ID for quick access
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.sTableId = "";
			
			/*
			 * Variable: nTable
			 * Purpose:  Cache the table node for quick access
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.nTable = null;
			
			/*
			 * Variable: nTHead
			 * Purpose:  Permanent ref to the thead element
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.nTHead = null;
			
			/*
			 * Variable: nTFoot
			 * Purpose:  Permanent ref to the tfoot element - if it exists
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.nTFoot = null;
			
			/*
			 * Variable: nTBody
			 * Purpose:  Permanent ref to the tbody element
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.nTBody = null;
			
			/*
			 * Variable: nTableWrapper
			 * Purpose:  Cache the wrapper node (contains all DataTables controlled elements)
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.nTableWrapper = null;
			
			/*
			 * Variable: bDeferLoading
			 * Purpose:  Indicate if when using server-side processing the loading of data 
			 *           should be deferred until the second draw
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bDeferLoading = false;
			
			/*
			 * Variable: bInitialised
			 * Purpose:  Indicate if all required information has been read in
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bInitialised = false;
			
			/*
			 * Variable: aoOpenRows
			 * Purpose:  Information about open rows
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    Has the parameters 'nTr' and 'nParent'
			 */
			this.aoOpenRows = [];
			
			/*
			 * Variable: sDom
			 * Purpose:  Dictate the positioning that the created elements will take
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    
			 *   The following options are allowed:
			 *     'l' - Length changing
			 *     'f' - Filtering input
			 *     't' - The table!
			 *     'i' - Information
			 *     'p' - Pagination
			 *     'r' - pRocessing
			 *   The following constants are allowed:
			 *     'H' - jQueryUI theme "header" classes
			 *     'F' - jQueryUI theme "footer" classes
			 *   The following syntax is expected:
			 *     '<' and '>' - div elements
			 *     '<"class" and '>' - div with a class
			 *   Examples:
			 *     '<"wrapper"flipt>', '<lf<t>ip>'
			 */
			this.sDom = 'lfrtip';
			
			/*
			 * Variable: sPaginationType
			 * Purpose:  Note which type of sorting should be used
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.sPaginationType = "two_button";
			
			/*
			 * Variable: iCookieDuration
			 * Purpose:  The cookie duration (for bStateSave) in seconds - default 2 hours
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.iCookieDuration = 60 * 60 * 2;
			
			/*
			 * Variable: sCookiePrefix
			 * Purpose:  The cookie name prefix
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.sCookiePrefix = "SpryMedia_DataTables_";
			
			/*
			 * Variable: fnCookieCallback
			 * Purpose:  Callback function for cookie creation
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnCookieCallback = null;
			
			/*
			 * Variable: aoStateSave
			 * Purpose:  Array of callback functions for state saving
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    Each array element is an object with the following parameters:
			 *   function:fn - function to call. Takes two parameters, oSettings and the JSON string to
			 *     save that has been thus far created. Returns a JSON string to be inserted into a 
			 *     json object (i.e. '"param": [ 0, 1, 2]')
			 *   string:sName - name of callback
			 */
			this.aoStateSave = [];
			
			/*
			 * Variable: aoStateLoad
			 * Purpose:  Array of callback functions for state loading
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    Each array element is an object with the following parameters:
			 *   function:fn - function to call. Takes two parameters, oSettings and the object stored.
			 *     May return false to cancel state loading.
			 *   string:sName - name of callback
			 */
			this.aoStateLoad = [];
			
			/*
			 * Variable: oLoadedState
			 * Purpose:  State that was loaded from the cookie. Useful for back reference
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.oLoadedState = null;
			
			/*
			 * Variable: sAjaxSource
			 * Purpose:  Source url for AJAX data for the table
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.sAjaxSource = null;
			
			/*
			 * Variable: sAjaxDataProp
			 * Purpose:  Property from a given object from which to read the table data from. This can
			 *           be an empty string (when not server-side processing), in which case it is 
			 *           assumed an an array is given directly.
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.sAjaxDataProp = 'aaData';
			
			/*
			 * Variable: bAjaxDataGet
			 * Purpose:  Note if draw should be blocked while getting data
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bAjaxDataGet = true;
			
			/*
			 * Variable: jqXHR
			 * Purpose:  The last jQuery XHR object that was used for server-side data gathering. 
			 *           This can be used for working with the XHR information in one of the callbacks
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.jqXHR = null;
			
			/*
			 * Variable: fnServerData
			 * Purpose:  Function to get the server-side data - can be overruled by the developer
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnServerData = function ( url, data, callback, settings ) {
				settings.jqXHR = $.ajax( {
					"url": url,
					"data": data,
					"success": callback,
					"dataType": "json",
					"cache": false,
					"error": function (xhr, error, thrown) {
						if ( error == "parsererror" ) {
							alert( "DataTables warning: JSON data from server could not be parsed. "+
								"This is caused by a JSON formatting error." );
						}
					}
				} );
			};
			
			/*
			 * Variable: fnFormatNumber
			 * Purpose:  Format numbers for display
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.fnFormatNumber = function ( iIn )
			{
				if ( iIn < 1000 )
				{
					/* A small optimisation for what is likely to be the vast majority of use cases */
					return iIn;
				}
				else
				{
					var s=(iIn+""), a=s.split(""), out="", iLen=s.length;
					
					for ( var i=0 ; i<iLen ; i++ )
					{
						if ( i%3 === 0 && i !== 0 )
						{
							out = ','+out;
						}
						out = a[iLen-i-1]+out;
					}
				}
				return out;
			};
			
			/*
			 * Variable: aLengthMenu
			 * Purpose:  List of options that can be used for the user selectable length menu
			 * Scope:    jQuery.dataTable.classSettings
			 * Note:     This varaible can take for form of a 1D array, in which case the value and the 
			 *   displayed value in the menu are the same, or a 2D array in which case the value comes
			 *   from the first array, and the displayed value to the end user comes from the second
			 *   array. 2D example: [ [ 10, 25, 50, 100, -1 ], [ 10, 25, 50, 100, 'All' ] ];
			 */
			this.aLengthMenu = [ 10, 25, 50, 100 ];
			
			/*
			 * Variable: iDraw
			 * Purpose:  Counter for the draws that the table does. Also used as a tracker for
			 *   server-side processing
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.iDraw = 0;
			
			/*
			 * Variable: bDrawing
			 * Purpose:  Indicate if a redraw is being done - useful for Ajax
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bDrawing = 0;
			
			/*
			 * Variable: iDrawError
			 * Purpose:  Last draw error
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.iDrawError = -1;
			
			/*
			 * Variable: _iDisplayLength, _iDisplayStart, _iDisplayEnd
			 * Purpose:  Display length variables
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    These variable must NOT be used externally to get the data length. Rather, use
			 *   the fnRecordsTotal() (etc) functions.
			 */
			this._iDisplayLength = 10;
			this._iDisplayStart = 0;
			this._iDisplayEnd = 10;
			
			/*
			 * Variable: _iRecordsTotal, _iRecordsDisplay
			 * Purpose:  Display length variables used for server side processing
			 * Scope:    jQuery.dataTable.classSettings
			 * Notes:    These variable must NOT be used externally to get the data length. Rather, use
			 *   the fnRecordsTotal() (etc) functions.
			 */
			this._iRecordsTotal = 0;
			this._iRecordsDisplay = 0;
			
			/*
			 * Variable: bJUI
			 * Purpose:  Should we add the markup needed for jQuery UI theming?
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bJUI = false;
			
			/*
			 * Variable: oClasses
			 * Purpose:  Should we add the markup needed for jQuery UI theming?
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.oClasses = _oExt.oStdClasses;
			
			/*
			 * Variable: bFiltered and bSorted
			 * Purpose:  Flags to allow callback functions to see what actions have been performed
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bFiltered = false;
			this.bSorted = false;
			
			/*
			 * Variable: bSortCellsTop
			 * Purpose:  Indicate that if multiple rows are in the header and there is more than one
			 *           unique cell per column, if the top one (true) or bottom one (false) should
			 *           be used for sorting / title by DataTables
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.bSortCellsTop = false;
			
			/*
			 * Variable: oInit
			 * Purpose:  Initialisation object that is used for the table
			 * Scope:    jQuery.dataTable.classSettings
			 */
			this.oInit = null;
		}
		
		/*
		 * Variable: oApi
		 * Purpose:  Container for publicly exposed 'private' functions
		 * Scope:    jQuery.dataTable
		 */
		this.oApi = {};
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - API functions
		 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/*
		 * Function: fnDraw
		 * Purpose:  Redraw the table
		 * Returns:  -
		 * Inputs:   bool:bComplete - Refilter and resort (if enabled) the table before the draw.
		 *             Optional: default - true
		 */
		this.fnDraw = function( bComplete )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			if ( typeof bComplete != 'undefined' && bComplete === false )
			{
				_fnCalculateEnd( oSettings );
				_fnDraw( oSettings );
			}
			else
			{
				_fnReDraw( oSettings );
			}
		};
		
		/*
		 * Function: fnFilter
		 * Purpose:  Filter the input based on data
		 * Returns:  -
		 * Inputs:   string:sInput - string to filter the table on
		 *           int:iColumn - optional - column to limit filtering to
		 *           bool:bRegex - optional - treat as regular expression or not - default false
		 *           bool:bSmart - optional - perform smart filtering or not - default true
		 *           bool:bShowGlobal - optional - show the input global filter in it's input box(es)
		 *              - default true
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			
			if ( !oSettings.oFeatures.bFilter )
			{
				return;
			}
			
			if ( typeof bRegex == 'undefined' )
			{
				bRegex = false;
			}
			
			if ( typeof bSmart == 'undefined' )
			{
				bSmart = true;
			}
			
			if ( typeof bShowGlobal == 'undefined' )
			{
				bShowGlobal = true;
			}
			
			if ( typeof iColumn == "undefined" || iColumn === null )
			{
				/* Global filter */
				_fnFilterComplete( oSettings, {
					"sSearch":sInput,
					"bRegex": bRegex,
					"bSmart": bSmart
				}, 1 );
				
				if ( bShowGlobal && typeof oSettings.aanFeatures.f != 'undefined' )
				{
					var n = oSettings.aanFeatures.f;
					for ( var i=0, iLen=n.length ; i<iLen ; i++ )
					{
						$('input', n[i]).val( sInput );
					}
				}
			}
			else
			{
				/* Single column filter */
				oSettings.aoPreSearchCols[ iColumn ].sSearch = sInput;
				oSettings.aoPreSearchCols[ iColumn ].bRegex = bRegex;
				oSettings.aoPreSearchCols[ iColumn ].bSmart = bSmart;
				_fnFilterComplete( oSettings, oSettings.oPreviousSearch, 1 );
			}
		};
		
		/*
		 * Function: fnSettings
		 * Purpose:  Get the settings for a particular table for extern. manipulation
		 * Returns:  -
		 * Inputs:   -
		 */
		this.fnSettings = function( nNode  )
		{
			return _fnSettingsFromNode( this[_oExt.iApiIndex] );
		};
		
		/*
		 * Function: fnVersionCheck
		 * Notes:    The function is the same as the 'static' function provided in the ext variable
		 */
		this.fnVersionCheck = _oExt.fnVersionCheck;
		
		/*
		 * Function: fnSort
		 * Purpose:  Sort the table by a particular row
		 * Returns:  -
		 * Inputs:   int:iCol - the data index to sort on. Note that this will
		 *   not match the 'display index' if you have hidden data entries
		 */
		this.fnSort = function( aaSort )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			oSettings.aaSorting = aaSort;
			_fnSort( oSettings );
		};
		
		/*
		 * Function: fnSortListener
		 * Purpose:  Attach a sort listener to an element for a given column
		 * Returns:  -
		 * Inputs:   node:nNode - the element to attach the sort listener to
		 *           int:iColumn - the column that a click on this node will sort on
		 *           function:fnCallback - callback function when sort is run - optional
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			_fnSortAttachListener( _fnSettingsFromNode( this[_oExt.iApiIndex] ), nNode, iColumn,
			 	fnCallback );
		};
		
		/*
		 * Function: fnAddData
		 * Purpose:  Add new row(s) into the table
		 * Returns:  array int: array of indexes (aoData) which have been added (zero length on error)
		 * Inputs:   array:mData - the data to be added. The length must match
		 *               the original data from the DOM
		 *             or
		 *             array array:mData - 2D array of data to be added
		 *           bool:bRedraw - redraw the table or not - default true
		 * Notes:    Warning - the refilter here will cause the table to redraw
		 *             starting at zero
		 * Notes:    Thanks to Yekimov Denis for contributing the basis for this function!
		 */
		this.fnAddData = function( mData, bRedraw )
		{
			if ( mData.length === 0 )
			{
				return [];
			}
			
			var aiReturn = [];
			var iTest;
			
			/* Find settings from table node */
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			
			/* Check if we want to add multiple rows or not */
			if ( typeof mData[0] == "object" )
			{
				for ( var i=0 ; i<mData.length ; i++ )
				{
					iTest = _fnAddData( oSettings, mData[i] );
					if ( iTest == -1 )
					{
						return aiReturn;
					}
					aiReturn.push( iTest );
				}
			}
			else
			{
				iTest = _fnAddData( oSettings, mData );
				if ( iTest == -1 )
				{
					return aiReturn;
				}
				aiReturn.push( iTest );
			}
			
			oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				_fnReDraw( oSettings );
			}
			return aiReturn;
		};
		
		/*
		 * Function: fnDeleteRow
		 * Purpose:  Remove a row for the table
		 * Returns:  array:aReturn - the row that was deleted
		 * Inputs:   mixed:mTarget - 
		 *             int: - index of aoData to be deleted, or
		 *             node(TR): - TR element you want to delete
		 *           function:fnCallBack - callback function - default null
		 *           bool:bRedraw - redraw the table or not - default true
		 */
		this.fnDeleteRow = function( mTarget, fnCallBack, bRedraw )
		{
			/* Find settings from table node */
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			var i, iAODataIndex;
			
			iAODataIndex = (typeof mTarget == 'object') ? 
				_fnNodeToDataIndex(oSettings, mTarget) : mTarget;
			
			/* Return the data array from this row */
			var oData = oSettings.aoData.splice( iAODataIndex, 1 );
			
			/* Remove the target row from the search array */
			var iDisplayIndex = $.inArray( iAODataIndex, oSettings.aiDisplay );
			oSettings.asDataSearch.splice( iDisplayIndex, 1 );
			
			/* Delete from the display arrays */
			_fnDeleteIndex( oSettings.aiDisplayMaster, iAODataIndex );
			_fnDeleteIndex( oSettings.aiDisplay, iAODataIndex );
			
			/* If there is a user callback function - call it */
			if ( typeof fnCallBack == "function" )
			{
				fnCallBack.call( this, oSettings, oData );
			}
			
			/* Check for an 'overflow' they case for dislaying the table */
			if ( oSettings._iDisplayStart >= oSettings.aiDisplay.length )
			{
				oSettings._iDisplayStart -= oSettings._iDisplayLength;
				if ( oSettings._iDisplayStart < 0 )
				{
					oSettings._iDisplayStart = 0;
				}
			}
			
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				_fnCalculateEnd( oSettings );
				_fnDraw( oSettings );
			}
			
			return oData;
		};
		
		/*
		 * Function: fnClearTable
		 * Purpose:  Quickly and simply clear a table
		 * Returns:  -
		 * Inputs:   bool:bRedraw - redraw the table or not - default true
		 * Notes:    Thanks to Yekimov Denis for contributing the basis for this function!
		 */
		this.fnClearTable = function( bRedraw )
		{
			/* Find settings from table node */
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			_fnClearTable( oSettings );
			
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				_fnDraw( oSettings );
			}
		};
		
		/*
		 * Function: fnOpen
		 * Purpose:  Open a display row (append a row after the row in question)
		 * Returns:  node:nNewRow - the row opened
		 * Inputs:   node:nTr - the table row to 'open'
		 *           string|node|jQuery:mHtml - the HTML to put into the row
		 *           string:sClass - class to give the new TD cell
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			/* Find settings from table node */
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			
			/* the old open one if there is one */
			this.fnClose( nTr );
			
			var nNewRow = document.createElement("tr");
			var nNewCell = document.createElement("td");
			nNewRow.appendChild( nNewCell );
			nNewCell.className = sClass;
			nNewCell.colSpan = _fnVisbleColumns( oSettings );

			if( typeof mHtml.jquery != 'undefined' || typeof mHtml == "object" )
			{
				nNewCell.appendChild( mHtml );
			}
			else
			{
				nNewCell.innerHTML = mHtml;
			}

			/* If the nTr isn't on the page at the moment - then we don't insert at the moment */
			var nTrs = $('tr', oSettings.nTBody);
			if ( $.inArray(nTr, nTrs) != -1 )
			{
				$(nNewRow).insertAfter(nTr);
			}
			
			oSettings.aoOpenRows.push( {
				"nTr": nNewRow,
				"nParent": nTr
			} );
			
			return nNewRow;
		};
		
		/*
		 * Function: fnClose
		 * Purpose:  Close a display row
		 * Returns:  int: 0 (success) or 1 (failed)
		 * Inputs:   node:nTr - the table row to 'close'
		 */
		this.fnClose = function( nTr )
		{
			/* Find settings from table node */
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			
			for ( var i=0 ; i<oSettings.aoOpenRows.length ; i++ )
			{
				if ( oSettings.aoOpenRows[i].nParent == nTr )
				{
					var nTrParent = oSettings.aoOpenRows[i].nTr.parentNode;
					if ( nTrParent )
					{
						/* Remove it if it is currently on display */
						nTrParent.removeChild( oSettings.aoOpenRows[i].nTr );
					}
					oSettings.aoOpenRows.splice( i, 1 );
					return 0;
				}
			}
			return 1;
		};
		
		/*
		 * Function: fnGetData
		 * Purpose:  Return an array with the data which is used to make up the table
		 * Returns:  array array string: 2d data array ([row][column]) or array string: 1d data array
		 *           or string if both row and column are given
		 * Inputs:   mixed:mRow - optional - if not present, then the full 2D array for the table 
		 *             if given then:
		 *               int: - return data object for aoData entry of this index
		 *               node(TR): - return data object for this TR element
		 *           int:iCol - optional - the column that you want the data of. This will take into
		 *               account mDataProp and return the value DataTables uses for this column
		 */
		this.fnGetData = function( mRow, iCol )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			
			if ( typeof mRow != 'undefined' )
			{
				var iRow = (typeof mRow == 'object') ? 
					_fnNodeToDataIndex(oSettings, mRow) : mRow;
				
				if ( typeof iCol != 'undefined' )
				{
					return _fnGetCellData( oSettings, iRow, iCol, '' );
				}
				return (typeof oSettings.aoData[iRow] != 'undefined') ? 
					oSettings.aoData[iRow]._aData : null;
			}
			return _fnGetDataMaster( oSettings );
		};
		
		/*
		 * Function: fnGetNodes
		 * Purpose:  Return an array with the TR nodes used for drawing the table
		 * Returns:  array node: TR elements
		 *           or
		 *           node (if iRow specified)
		 * Inputs:   int:iRow - optional - if present then the array returned will be the node for
		 *             the row with the index 'iRow'
		 */
		this.fnGetNodes = function( iRow )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			
			if ( typeof iRow != 'undefined' )
			{
				return (typeof oSettings.aoData[iRow] != 'undefined') ? oSettings.aoData[iRow].nTr : null;
			}
			return _fnGetTrNodes( oSettings );
		};
		
		/*
		 * Function: fnGetPosition
		 * Purpose:  Get the array indexes of a particular cell from it's DOM element
		 * Returns:  int: - row index, or array[ int, int, int ]: - row index, column index (visible)
		 *             and column index including hidden columns
		 * Inputs:   node:nNode - this can either be a TR, TD or TH in the table's body, the return is
		 *             dependent on this input
		 */
		this.fnGetPosition = function( nNode )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			var sNodeName = nNode.nodeName.toUpperCase();
			
			if ( sNodeName == "TR" )
			{
				return _fnNodeToDataIndex(oSettings, nNode);
			}
			else if ( sNodeName == "TD" || sNodeName == "TH" )
			{
				var iDataIndex = _fnNodeToDataIndex(oSettings, nNode.parentNode);
				var anCells = _fnGetTdNodes( oSettings, iDataIndex );

				for ( var i=0 ; i<oSettings.aoColumns.length ; i++ )
				{
					if ( anCells[i] == nNode )
					{
						return [ iDataIndex, _fnColumnIndexToVisible(oSettings, i ), i ];
					}
				}
			}
			return null;
		};
		
		/*
		 * Function: fnUpdate
		 * Purpose:  Update a table cell or row - this method will accept either a single value to
		 *             update the cell with, an array of values with one element for each column or
		 *             an object in the same format as the original data source. The function is
		 *             self-referencing in order to make the multi column updates easier.
		 * Returns:  int: 0 okay, 1 error
		 * Inputs:   object | array string | string:mData - data to update the cell/row with
		 *           mixed:mRow - 
		 *             int: - index of aoData to be updated, or
		 *             node(TR): - TR element you want to update
		 *           int:iColumn - the column to update - optional (not used of mData is an array or object)
		 *           bool:bRedraw - redraw the table or not - default true
		 *           bool:bAction - perform predraw actions or not (you will want this as 'true' if
		 *             you have bRedraw as true) - default true
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			var iVisibleColumn, i, iLen, sDisplay;
			var iRow = (typeof mRow == 'object') ? 
				_fnNodeToDataIndex(oSettings, mRow) : mRow;
			
			if ( $.isArray(mData) && typeof mData == 'object' )
			{
				/* Array update - update the whole row */
				oSettings.aoData[iRow]._aData = mData.slice();

				for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
				{
					this.fnUpdate( _fnGetCellData( oSettings, iRow, i ), iRow, i, false, false );
				}
			}
			else if ( typeof mData == 'object' )
			{
				/* Object update - update the whole row - assume the developer gets the object right */
				oSettings.aoData[iRow]._aData = $.extend( true, {}, mData );

				for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
				{
					this.fnUpdate( _fnGetCellData( oSettings, iRow, i ), iRow, i, false, false );
				}
			}
			else
			{
				/* Individual cell update */
				sDisplay = mData;
				_fnSetCellData( oSettings, iRow, iColumn, sDisplay );
				
				if ( oSettings.aoColumns[iColumn].fnRender !== null )
				{
					sDisplay = oSettings.aoColumns[iColumn].fnRender( {
						"iDataRow": iRow,
						"iDataColumn": iColumn,
						"aData": oSettings.aoData[iRow]._aData,
						"oSettings": oSettings
					} );
					
					if ( oSettings.aoColumns[iColumn].bUseRendered )
					{
						_fnSetCellData( oSettings, iRow, iColumn, sDisplay );
					}
				}
				
				if ( oSettings.aoData[iRow].nTr !== null )
				{
					/* Do the actual HTML update */
					_fnGetTdNodes( oSettings, iRow )[iColumn].innerHTML = sDisplay;
				}
			}
			
			/* Modify the search index for this row (strictly this is likely not needed, since fnReDraw
			 * will rebuild the search array - however, the redraw might be disabled by the user)
			 */
			var iDisplayIndex = $.inArray( iRow, oSettings.aiDisplay );
			oSettings.asDataSearch[iDisplayIndex] = _fnBuildSearchRow( oSettings, 
				_fnGetRowData( oSettings, iRow, 'filter' ) );
			
			/* Perform pre-draw actions */
			if ( typeof bAction == 'undefined' || bAction )
			{
				_fnAjustColumnSizing( oSettings );
			}
			
			/* Redraw the table */
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				_fnReDraw( oSettings );
			}
			return 0;
		};
		
		
		/*
		 * Function: fnShowColoumn
		 * Purpose:  Show a particular column
		 * Returns:  -
		 * Inputs:   int:iCol - the column whose display should be changed
		 *           bool:bShow - show (true) or hide (false) the column
		 *           bool:bRedraw - redraw the table or not - default true
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			var i, iLen;
			var iColumns = oSettings.aoColumns.length;
			var nTd, nCell, anTrs, jqChildren, bAppend, iBefore;
			
			/* No point in doing anything if we are requesting what is already true */
			if ( oSettings.aoColumns[iCol].bVisible == bShow )
			{
				return;
			}
			
			/* Show the column */
			if ( bShow )
			{
				var iInsert = 0;
				for ( i=0 ; i<iCol ; i++ )
				{
					if ( oSettings.aoColumns[i].bVisible )
					{
						iInsert++;
					}
				}
				
				/* Need to decide if we should use appendChild or insertBefore */
				bAppend = (iInsert >= _fnVisbleColumns( oSettings ));

				/* Which coloumn should we be inserting before? */
				if ( !bAppend )
				{
					for ( i=iCol ; i<iColumns ; i++ )
					{
						if ( oSettings.aoColumns[i].bVisible )
						{
							iBefore = i;
							break;
						}
					}
				}

				for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
				{
					if ( oSettings.aoData[i].nTr !== null )
					{
						if ( bAppend )
						{
							oSettings.aoData[i].nTr.appendChild( 
								oSettings.aoData[i]._anHidden[iCol]
							);
						}
						else
						{
							oSettings.aoData[i].nTr.insertBefore(
								oSettings.aoData[i]._anHidden[iCol], 
								_fnGetTdNodes( oSettings, i )[iBefore] );
						}
					}
				}
			}
			else
			{
				/* Remove a column from display */
				for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
				{
					if ( oSettings.aoData[i].nTr !== null )
					{
						nTd = _fnGetTdNodes( oSettings, i )[iCol];
						oSettings.aoData[i]._anHidden[iCol] = nTd;
						nTd.parentNode.removeChild( nTd );
					}
				}
			}

			/* Clear to set the visible flag */
			oSettings.aoColumns[iCol].bVisible = bShow;

			/* Redraw the header and footer based on the new column visibility */
			_fnDrawHead( oSettings, oSettings.aoHeader );
			if ( oSettings.nTFoot )
			{
				_fnDrawHead( oSettings, oSettings.aoFooter );
			}
			
			/* If there are any 'open' rows, then we need to alter the colspan for this col change */
			for ( i=0, iLen=oSettings.aoOpenRows.length ; i<iLen ; i++ )
			{
				oSettings.aoOpenRows[i].nTr.colSpan = _fnVisbleColumns( oSettings );
			}
			
			/* Do a redraw incase anything depending on the table columns needs it 
			 * (built-in: scrolling) 
			 */
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				_fnAjustColumnSizing( oSettings );
				_fnDraw( oSettings );
			}
			
			_fnSaveState( oSettings );
		};
		
		/*
		 * Function: fnPageChange
		 * Purpose:  Change the pagination
		 * Returns:  -
		 * Inputs:   string:sAction - paging action to take: "first", "previous", "next" or "last"
		 *           bool:bRedraw - redraw the table or not - optional - default true
		 */
		this.fnPageChange = function ( sAction, bRedraw )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			_fnPageChange( oSettings, sAction );
			_fnCalculateEnd( oSettings );
			
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				_fnDraw( oSettings );
			}
		};
		
		/*
		 * Function: fnDestroy
		 * Purpose:  Destructor for the DataTable
		 * Returns:  -
		 * Inputs:   -
		 */
		this.fnDestroy = function ( )
		{
			var oSettings = _fnSettingsFromNode( this[_oExt.iApiIndex] );
			var nOrig = oSettings.nTableWrapper.parentNode;
			var nBody = oSettings.nTBody;
			var i, iLen;
			
			/* Flag to note that the table is currently being destoryed - no action should be taken */
			oSettings.bDestroying = true;
			
			/* Restore hidden columns */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				if ( oSettings.aoColumns[i].bVisible === false )
				{
					this.fnSetColumnVis( i, true );
				}
			}
			
			/* Blitz all DT events */
			$(oSettings.nTableWrapper).find('*').andSelf().unbind('.DT');
			
			/* If there is an 'empty' indicator row, remove it */
			$('tbody>tr>td.'+oSettings.oClasses.sRowEmpty, oSettings.nTable).parent().remove();
			
			/* When scrolling we had to break the table up - restore it */
			if ( oSettings.nTable != oSettings.nTHead.parentNode )
			{
				$('>thead', oSettings.nTable).remove();
				oSettings.nTable.appendChild( oSettings.nTHead );
			}
			
			if ( oSettings.nTFoot && oSettings.nTable != oSettings.nTFoot.parentNode )
			{
				$('>tfoot', oSettings.nTable).remove();
				oSettings.nTable.appendChild( oSettings.nTFoot );
			}
			
			/* Remove the DataTables generated nodes, events and classes */
			oSettings.nTable.parentNode.removeChild( oSettings.nTable );
			$(oSettings.nTableWrapper).remove();
			
			oSettings.aaSorting = [];
			oSettings.aaSortingFixed = [];
			_fnSortingClasses( oSettings );
			
			$(_fnGetTrNodes( oSettings )).removeClass( oSettings.asStripClasses.join(' ') );
			
			if ( !oSettings.bJUI )
			{
				$('th', oSettings.nTHead).removeClass( [ _oExt.oStdClasses.sSortable,
					_oExt.oStdClasses.sSortableAsc,
					_oExt.oStdClasses.sSortableDesc,
					_oExt.oStdClasses.sSortableNone ].join(' ')
				);
			}
			else
			{
				$('th', oSettings.nTHead).removeClass( [ _oExt.oStdClasses.sSortable,
					_oExt.oJUIClasses.sSortableAsc,
					_oExt.oJUIClasses.sSortableDesc,
					_oExt.oJUIClasses.sSortableNone ].join(' ')
				);
				$('th span.'+_oExt.oJUIClasses.sSortIcon, oSettings.nTHead).remove();

				$('th', oSettings.nTHead).each( function () {
					var jqWrapper = $('div.'+_oExt.oJUIClasses.sSortJUIWrapper, this);
					var kids = jqWrapper.contents();
					$(this).append( kids );
					jqWrapper.remove();
				} );
			}
			
			/* Add the TR elements back into the table in their original order */
			if ( oSettings.nTableReinsertBefore )
			{
				nOrig.insertBefore( oSettings.nTable, oSettings.nTableReinsertBefore );
			}
			else
			{
				nOrig.appendChild( oSettings.nTable );
			}

			for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
			{
				if ( oSettings.aoData[i].nTr !== null )
				{
					nBody.appendChild( oSettings.aoData[i].nTr );
				}
			}
			
			/* Restore the width of the original table */
			if ( oSettings.oFeatures.bAutoWidth === true )
			{
			  oSettings.nTable.style.width = _fnStringToCss(oSettings.sDestroyWidth);
			}
			
			/* If the were originally odd/even type classes - then we add them back here. Note
			 * this is not fool proof (for example if not all rows as odd/even classes - but 
			 * it's a good effort without getting carried away
			 */
			$('>tr:even', nBody).addClass( oSettings.asDestoryStrips[0] );
			$('>tr:odd', nBody).addClass( oSettings.asDestoryStrips[1] );
			
			/* Remove the settings object from the settings array */
			for ( i=0, iLen=_aoSettings.length ; i<iLen ; i++ )
			{
				if ( _aoSettings[i] == oSettings )
				{
					_aoSettings.splice( i, 1 );
				}
			}
			
			/* End it all */
			oSettings = null;
		};
		
		/*
		 * Function: fnAjustColumnSizing
		 * Purpose:  Update tale sizing based on content. This would most likely be used for scrolling
		 *   and will typically need a redraw after it.
		 * Returns:  -
		 * Inputs:   bool:bRedraw - redraw the table or not, you will typically want to - default true
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
			_fnAjustColumnSizing( oSettings );
			
			if ( typeof bRedraw == 'undefined' || bRedraw )
			{
				this.fnDraw( false );
			}
			else if ( oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "" )
			{
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				this.oApi._fnScrollDraw(oSettings);
			}
		};
		
		/*
		 * Plugin API functions
		 * 
		 * This call will add the functions which are defined in _oExt.oApi to the
		 * DataTables object, providing a rather nice way to allow plug-in API functions. Note that
		 * this is done here, so that API function can actually override the built in API functions if
		 * required for a particular purpose.
		 */
		
		/*
		 * Function: _fnExternApiFunc
		 * Purpose:  Create a wrapper function for exporting an internal func to an external API func
		 * Returns:  function: - wrapped function
		 * Inputs:   string:sFunc - API function name
		 */
		function _fnExternApiFunc (sFunc)
		{
			return function() {
					var aArgs = [_fnSettingsFromNode(this[_oExt.iApiIndex])].concat( 
						Array.prototype.slice.call(arguments) );
					return _oExt.oApi[sFunc].apply( this, aArgs );
				};
		}
		
		for ( var sFunc in _oExt.oApi )
		{
			if ( sFunc )
			{
				/*
				 * Function: anon
				 * Purpose:  Wrap the plug-in API functions in order to provide the settings as 1st arg 
				 *   and execute in this scope
				 * Returns:  -
				 * Inputs:   -
				 */
				this[sFunc] = _fnExternApiFunc(sFunc);
			}
		}
		
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Local functions
		 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Initalisation
		 */
		
		/*
		 * Function: _fnInitalise
		 * Purpose:  Draw the table for the first time, adding all required features
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnInitalise ( oSettings )
		{
			var i, iLen, iAjaxStart=oSettings.iInitDisplayStart;
			
			/* Ensure that the table data is fully initialised */
			if ( oSettings.bInitialised === false )
			{
				setTimeout( function(){ _fnInitalise( oSettings ); }, 200 );
				return;
			}
			
			/* Show the display HTML options */
			_fnAddOptionsHtml( oSettings );
			
			/* Build and draw the header / footer for the table */
			_fnBuildHead( oSettings );
			_fnDrawHead( oSettings, oSettings.aoHeader );
			if ( oSettings.nTFoot )
			{
				_fnDrawHead( oSettings, oSettings.aoFooter );
			}

			/* Okay to show that something is going on now */
			_fnProcessingDisplay( oSettings, true );
			
			/* Calculate sizes for columns */
			if ( oSettings.oFeatures.bAutoWidth )
			{
				_fnCalculateColumnWidths( oSettings );
			}
			
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				if ( oSettings.aoColumns[i].sWidth !== null )
				{
					oSettings.aoColumns[i].nTh.style.width = _fnStringToCss( oSettings.aoColumns[i].sWidth );
				}
			}
			
			/* If there is default sorting required - let's do it. The sort function will do the
			 * drawing for us. Otherwise we draw the table regardless of the Ajax source - this allows
			 * the table to look initialised for Ajax sourcing data (show 'loading' message possibly)
			 */
			if ( oSettings.oFeatures.bSort )
			{
				_fnSort( oSettings );
			}
			else if ( oSettings.oFeatures.bFilter )
			{
				_fnFilterComplete( oSettings, oSettings.oPreviousSearch );
			}
			else
			{
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
				_fnCalculateEnd( oSettings );
				_fnDraw( oSettings );
			}
			
			/* if there is an ajax source load the data */
			if ( oSettings.sAjaxSource !== null && !oSettings.oFeatures.bServerSide )
			{
				oSettings.fnServerData.call( oSettings.oInstance, oSettings.sAjaxSource, [], function(json) {
					var aData = json;
					if ( oSettings.sAjaxDataProp !== "" )
					{
						var fnDataSrc = _fnGetObjectDataFn( oSettings.sAjaxDataProp );
						aData = fnDataSrc( json );
					}

					/* Got the data - add it to the table */
					for ( i=0 ; i<aData.length ; i++ )
					{
						_fnAddData( oSettings, aData[i] );
					}
					
					/* Reset the init display for cookie saving. We've already done a filter, and
					 * therefore cleared it before. So we need to make it appear 'fresh'
					 */
					oSettings.iInitDisplayStart = iAjaxStart;
					
					if ( oSettings.oFeatures.bSort )
					{
						_fnSort( oSettings );
					}
					else
					{
						oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
						_fnCalculateEnd( oSettings );
						_fnDraw( oSettings );
					}
					
					_fnProcessingDisplay( oSettings, false );
					_fnInitComplete( oSettings, json );
				}, oSettings );
				return;
			}
			
			/* Server-side processing initialisation complete is done at the end of _fnDraw */
			if ( !oSettings.oFeatures.bServerSide )
			{
				_fnProcessingDisplay( oSettings, false );
				_fnInitComplete( oSettings );
			}
		}
		
		/*
		 * Function: _fnInitalise
		 * Purpose:  Draw the table for the first time, adding all required features
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnInitComplete ( oSettings, json )
		{
			oSettings._bInitComplete = true;
			if ( typeof oSettings.fnInitComplete == 'function' )
			{
				if ( typeof json != 'undefined' )
				{
					oSettings.fnInitComplete.call( oSettings.oInstance, oSettings, json );
				}
				else
				{
					oSettings.fnInitComplete.call( oSettings.oInstance, oSettings );
				}
			}
		}
		
		/*
		 * Function: _fnLanguageProcess
		 * Purpose:  Copy language variables from remote object to a local one
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           object:oLanguage - Language information
		 *           bool:bInit - init once complete
		 */
		function _fnLanguageProcess( oSettings, oLanguage, bInit )
		{
			_fnMap( oSettings.oLanguage, oLanguage, 'sProcessing' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sLengthMenu' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sEmptyTable' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sLoadingRecords' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sZeroRecords' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sInfo' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sInfoEmpty' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sInfoFiltered' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sInfoPostFix' );
			_fnMap( oSettings.oLanguage, oLanguage, 'sSearch' );
			
			if ( typeof oLanguage.oPaginate != 'undefined' )
			{
				_fnMap( oSettings.oLanguage.oPaginate, oLanguage.oPaginate, 'sFirst' );
				_fnMap( oSettings.oLanguage.oPaginate, oLanguage.oPaginate, 'sPrevious' );
				_fnMap( oSettings.oLanguage.oPaginate, oLanguage.oPaginate, 'sNext' );
				_fnMap( oSettings.oLanguage.oPaginate, oLanguage.oPaginate, 'sLast' );
			}
			
			/* Backwards compatibility - if there is no sEmptyTable given, then use the same as
			 * sZeroRecords - assuming that is given.
			 */
			if ( typeof oLanguage.sEmptyTable == 'undefined' && 
			     typeof oLanguage.sZeroRecords != 'undefined' )
			{
				_fnMap( oSettings.oLanguage, oLanguage, 'sZeroRecords', 'sEmptyTable' );
			}

			/* Likewise with loading records */
			if ( typeof oLanguage.sLoadingRecords == 'undefined' && 
			     typeof oLanguage.sZeroRecords != 'undefined' )
			{
				_fnMap( oSettings.oLanguage, oLanguage, 'sZeroRecords', 'sLoadingRecords' );
			}
			
			if ( bInit )
			{
				_fnInitalise( oSettings );
			}
		}
		
		/*
		 * Function: _fnAddColumn
		 * Purpose:  Add a column to the list used for the table with default values
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:nTh - the th element for this column
		 */
		function _fnAddColumn( oSettings, nTh )
		{
			var iCol = oSettings.aoColumns.length;
			var oCol = {
				"sType": null,
				"_bAutoType": true,
				"bVisible": true,
				"bSearchable": true,
				"bSortable": true,
				"asSorting": [ 'asc', 'desc' ],
				"sSortingClass": oSettings.oClasses.sSortable,
				"sSortingClassJUI": oSettings.oClasses.sSortJUI,
				"sTitle": nTh ? nTh.innerHTML : '',
				"sName": '',
				"sWidth": null,
				"sWidthOrig": null,
				"sClass": null,
				"fnRender": null,
				"bUseRendered": true,
				"iDataSort": iCol,
				"mDataProp": iCol,
				"fnGetData": null,
				"fnSetData": null,
				"sSortDataType": 'std',
				"sDefaultContent": null,
				"sContentPadding": "",
				"nTh": nTh ? nTh : document.createElement('th'),
				"nTf": null
			};
			oSettings.aoColumns.push( oCol );
			
			/* Add a column specific filter */
			if ( typeof oSettings.aoPreSearchCols[ iCol ] == 'undefined' ||
			     oSettings.aoPreSearchCols[ iCol ] === null )
			{
				oSettings.aoPreSearchCols[ iCol ] = {
					"sSearch": "",
					"bRegex": false,
					"bSmart": true
				};
			}
			else
			{
				/* Don't require that the user must specify bRegex and / or bSmart */
				if ( typeof oSettings.aoPreSearchCols[ iCol ].bRegex == 'undefined' )
				{
					oSettings.aoPreSearchCols[ iCol ].bRegex = true;
				}
				
				if ( typeof oSettings.aoPreSearchCols[ iCol ].bSmart == 'undefined' )
				{
					oSettings.aoPreSearchCols[ iCol ].bSmart = true;
				}
			}
			
			/* Use the column options function to initialise classes etc */
			_fnColumnOptions( oSettings, iCol, null );
		}
		
		/*
		 * Function: _fnColumnOptions
		 * Purpose:  Apply options for a column
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iCol - column index to consider
		 *           object:oOptions - object with sType, bVisible and bSearchable
		 */
		function _fnColumnOptions( oSettings, iCol, oOptions )
		{
			var oCol = oSettings.aoColumns[ iCol ];
			
			/* User specified column options */
			if ( typeof oOptions != 'undefined' && oOptions !== null )
			{
				if ( typeof oOptions.sType != 'undefined' )
				{
					oCol.sType = oOptions.sType;
					oCol._bAutoType = false;
				}
				
				_fnMap( oCol, oOptions, "bVisible" );
				_fnMap( oCol, oOptions, "bSearchable" );
				_fnMap( oCol, oOptions, "bSortable" );
				_fnMap( oCol, oOptions, "sTitle" );
				_fnMap( oCol, oOptions, "sName" );
				_fnMap( oCol, oOptions, "sWidth" );
				_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
				_fnMap( oCol, oOptions, "sClass" );
				_fnMap( oCol, oOptions, "fnRender" );
				_fnMap( oCol, oOptions, "bUseRendered" );
				_fnMap( oCol, oOptions, "iDataSort" );
				_fnMap( oCol, oOptions, "mDataProp" );
				_fnMap( oCol, oOptions, "asSorting" );
				_fnMap( oCol, oOptions, "sSortDataType" );
				_fnMap( oCol, oOptions, "sDefaultContent" );
				_fnMap( oCol, oOptions, "sContentPadding" );
			}

			/* Cache the data get and set functions for speed */
			oCol.fnGetData = _fnGetObjectDataFn( oCol.mDataProp );
			oCol.fnSetData = _fnSetObjectDataFn( oCol.mDataProp );
			
			/* Feature sorting overrides column specific when off */
			if ( !oSettings.oFeatures.bSort )
			{
				oCol.bSortable = false;
			}
			
			/* Check that the class assignment is correct for sorting */
			if ( !oCol.bSortable ||
					 ($.inArray('asc', oCol.asSorting) == -1 && $.inArray('desc', oCol.asSorting) == -1) )
			{
				oCol.sSortingClass = oSettings.oClasses.sSortableNone;
				oCol.sSortingClassJUI = "";
			}
			else if ( oCol.bSortable ||
                ($.inArray('asc', oCol.asSorting) == -1 && $.inArray('desc', oCol.asSorting) == -1) )
      {
        oCol.sSortingClass = oSettings.oClasses.sSortable;
        oCol.sSortingClassJUI = oSettings.oClasses.sSortJUI;
      }
			else if ( $.inArray('asc', oCol.asSorting) != -1 && $.inArray('desc', oCol.asSorting) == -1 )
			{
				oCol.sSortingClass = oSettings.oClasses.sSortableAsc;
				oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIAscAllowed;
			}
			else if ( $.inArray('asc', oCol.asSorting) == -1 && $.inArray('desc', oCol.asSorting) != -1 )
			{
				oCol.sSortingClass = oSettings.oClasses.sSortableDesc;
				oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIDescAllowed;
			}
		}
		
		/*
		 * Function: _fnAddData
		 * Purpose:  Add a data array to the table, creating DOM node etc
		 * Returns:  int: - >=0 if successful (index of new aoData entry), -1 if failed
		 * Inputs:   object:oSettings - dataTables settings object
		 *           array:aData - data array to be added
		 * Notes:    There are two basic methods for DataTables to get data to display - a JS array
		 *   (which is dealt with by this function), and the DOM, which has it's own optimised
		 *   function (_fnGatherData). Be careful to make the same changes here as there and vice-versa
		 */
		function _fnAddData ( oSettings, aDataSupplied )
		{
			var oCol;
			
			/* Take an independent copy of the data source so we can bash it about as we wish */
			var aDataIn = (typeof aDataSupplied.length == 'number') ?
				aDataSupplied.slice() :
				$.extend( true, {}, aDataSupplied );
			
			/* Create the object for storing information about this new row */
			var iRow = oSettings.aoData.length;
			var oData = {
				"nTr": null,
				"_iId": oSettings.iNextId++,
				"_aData": aDataIn,
				"_anHidden": [],
				"_sRowStripe": ""
			};
			oSettings.aoData.push( oData );

			/* Create the cells */
			var nTd, sThisType;
			for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];

				/* Use rendered data for filtering/sorting */
				if ( typeof oCol.fnRender == 'function' && oCol.bUseRendered && oCol.mDataProp !== null )
				{
					_fnSetCellData( oSettings, iRow, i, oCol.fnRender( {
						"iDataRow": iRow,
						"iDataColumn": i,
						"aData": oData._aData,
						"oSettings": oSettings
					} ) );
				}
				
				/* See if we should auto-detect the column type */
				if ( oCol._bAutoType && oCol.sType != 'string' )
				{
					/* Attempt to auto detect the type - same as _fnGatherData() */
					var sVarType = _fnGetCellData( oSettings, iRow, i, 'type' );
					if ( sVarType !== null && sVarType !== '' )
					{
						sThisType = _fnDetectType( sVarType );
						if ( oCol.sType === null )
						{
							oCol.sType = sThisType;
						}
						else if ( oCol.sType != sThisType )
						{
							/* String is always the 'fallback' option */
							oCol.sType = 'string';
						}
					}
				}
			}
			
			/* Add to the display array */
			oSettings.aiDisplayMaster.push( iRow );

			/* Create the DOM imformation */
			if ( !oSettings.oFeatures.bDeferRender )
			{
				_fnCreateTr( oSettings, iRow );
			}

			return iRow;
		}
		
		/*
		 * Function: _fnCreateTr
		 * Purpose:  Create a new TR element (and it's TD children) for a row
		 * Returns:  void
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iRow - Row to consider
		 */
		function _fnCreateTr ( oSettings, iRow )
		{
			var oData = oSettings.aoData[iRow];
			var nTd;

			if ( oData.nTr === null )
			{
				oData.nTr = document.createElement('tr');

				/* Special parameters can be given by the data source to be used on the row */
				if ( typeof oData._aData.DT_RowId != 'undefined' )
				{
					oData.nTr.setAttribute( 'id', oData._aData.DT_RowId );
				}

				if ( typeof oData._aData.DT_RowClass != 'undefined' )
				{
					$(oData.nTr).addClass( oData._aData.DT_RowClass );
				}

				/* Process each column */
				for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
				{
					var oCol = oSettings.aoColumns[i];
					nTd = document.createElement('td');

					/* Render if needed - if bUseRendered is true then we already have the rendered
					 * value in the data source - so can just use that
					 */
					if ( typeof oCol.fnRender == 'function' && (!oCol.bUseRendered || oCol.mDataProp === null) )
					{
						nTd.innerHTML = oCol.fnRender( {
							"iDataRow": iRow,
							"iDataColumn": i,
							"aData": oData._aData,
							"oSettings": oSettings
						} );
					}
					else
					{
						nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
					}
				
					/* Add user defined class */
					if ( oCol.sClass !== null )
					{
						nTd.className = oCol.sClass;
					}
					
					if ( oCol.bVisible )
					{
						oData.nTr.appendChild( nTd );
						oData._anHidden[i] = null;
					}
					else
					{
						oData._anHidden[i] = nTd;
					}
				}
			}
		}
		
		/*
		 * Function: _fnGatherData
		 * Purpose:  Read in the data from the target table from the DOM
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 * Notes:    This is a optimised version of _fnAddData (more or less) for reading information
		 *   from the DOM. The basic actions must be identical in the two functions.
		 */
		function _fnGatherData( oSettings )
		{
			var iLoop, i, iLen, j, jLen, jInner,
			 	nTds, nTrs, nTd, aLocalData, iThisIndex,
				iRow, iRows, iColumn, iColumns, sNodeName;
			
			/*
			 * Process by row first
			 * Add the data object for the whole table - storing the tr node. Note - no point in getting
			 * DOM based data if we are going to go and replace it with Ajax source data.
			 */
			if ( oSettings.bDeferLoading || oSettings.sAjaxSource === null )
			{
				nTrs = oSettings.nTBody.childNodes;
				for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
				{
					if ( nTrs[i].nodeName.toUpperCase() == "TR" )
					{
						iThisIndex = oSettings.aoData.length;
						oSettings.aoData.push( {
							"nTr": nTrs[i],
							"_iId": oSettings.iNextId++,
							"_aData": [],
							"_anHidden": [],
							"_sRowStripe": ''
						} );
						
						oSettings.aiDisplayMaster.push( iThisIndex );
						nTds = nTrs[i].childNodes;
						jInner = 0;
						
						for ( j=0, jLen=nTds.length ; j<jLen ; j++ )
						{
							sNodeName = nTds[j].nodeName.toUpperCase();
							if ( sNodeName == "TD" || sNodeName == "TH" )
							{
								_fnSetCellData( oSettings, iThisIndex, jInner, $.trim(nTds[j].innerHTML) );
								jInner++;
							}
						}
					}
				}
			}
			
			/* Gather in the TD elements of the Table - note that this is basically the same as
			 * fnGetTdNodes, but that function takes account of hidden columns, which we haven't yet
			 * setup!
			 */
			nTrs = _fnGetTrNodes( oSettings );
			nTds = [];
			for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
			{
				for ( j=0, jLen=nTrs[i].childNodes.length ; j<jLen ; j++ )
				{
					nTd = nTrs[i].childNodes[j];
					sNodeName = nTd.nodeName.toUpperCase();
					if ( sNodeName == "TD" || sNodeName == "TH" )
					{
						nTds.push( nTd );
					}
				}
			}
			
			/* Sanity check */
			if ( nTds.length != nTrs.length * oSettings.aoColumns.length )
			{
				_fnLog( oSettings, 1, "Unexpected number of TD elements. Expected "+
					(nTrs.length * oSettings.aoColumns.length)+" and got "+nTds.length+". DataTables does "+
					"not support rowspan / colspan in the table body, and there must be one cell for each "+
					"row/column combination." );
			}
			
			/* Now process by column */
			for ( iColumn=0, iColumns=oSettings.aoColumns.length ; iColumn<iColumns ; iColumn++ )
			{
				/* Get the title of the column - unless there is a user set one */
				if ( oSettings.aoColumns[iColumn].sTitle === null )
				{
					oSettings.aoColumns[iColumn].sTitle = oSettings.aoColumns[iColumn].nTh.innerHTML;
				}
				
				var
					bAutoType = oSettings.aoColumns[iColumn]._bAutoType,
					bRender = typeof oSettings.aoColumns[iColumn].fnRender == 'function',
					bClass = oSettings.aoColumns[iColumn].sClass !== null,
					bVisible = oSettings.aoColumns[iColumn].bVisible,
					nCell, sThisType, sRendered, sValType;
				
				/* A single loop to rule them all (and be more efficient) */
				if ( bAutoType || bRender || bClass || !bVisible )
				{
					for ( iRow=0, iRows=oSettings.aoData.length ; iRow<iRows ; iRow++ )
					{
						nCell = nTds[ (iRow*iColumns) + iColumn ];
						
						/* Type detection */
						if ( bAutoType && oSettings.aoColumns[iColumn].sType != 'string' )
						{
							sValType = _fnGetCellData( oSettings, iRow, iColumn, 'type' );
							if ( sValType !== '' )
							{
								sThisType = _fnDetectType( sValType );
								if ( oSettings.aoColumns[iColumn].sType === null )
								{
									oSettings.aoColumns[iColumn].sType = sThisType;
								}
								else if ( oSettings.aoColumns[iColumn].sType != sThisType )
								{
									/* String is always the 'fallback' option */
									oSettings.aoColumns[iColumn].sType = 'string';
								}
							}
						}
						
						/* Rendering */
						if ( bRender )
						{
							sRendered = oSettings.aoColumns[iColumn].fnRender( {
									"iDataRow": iRow,
									"iDataColumn": iColumn,
									"aData": oSettings.aoData[iRow]._aData,
									"oSettings": oSettings
								} );
							nCell.innerHTML = sRendered;
							if ( oSettings.aoColumns[iColumn].bUseRendered )
							{
								/* Use the rendered data for filtering/sorting */
								_fnSetCellData( oSettings, iRow, iColumn, sRendered );
							}
						}
						
						/* Classes */
						if ( bClass )
						{
							nCell.className += ' '+oSettings.aoColumns[iColumn].sClass;
						}
						
						/* Column visability */
						if ( !bVisible )
						{
							oSettings.aoData[iRow]._anHidden[iColumn] = nCell;
							nCell.parentNode.removeChild( nCell );
						}
						else
						{
							oSettings.aoData[iRow]._anHidden[iColumn] = null;
						}
					}
				}
			}
		}
		
		/*
		 * Function: _fnBuildHead
		 * Purpose:  Create the HTML header for the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnBuildHead( oSettings )
		{
			var i, nTh, iLen, j, jLen;
			var anTr = oSettings.nTHead.getElementsByTagName('tr');
			var iThs = oSettings.nTHead.getElementsByTagName('th').length;
			var iCorrector = 0;
			var jqChildren;
			
			/* If there is a header in place - then use it - otherwise it's going to get nuked... */
			if ( iThs !== 0 )
			{
				/* We've got a thead from the DOM, so remove hidden columns and apply width to vis cols */
				for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
				{
					nTh = oSettings.aoColumns[i].nTh;
					
					if ( oSettings.aoColumns[i].sClass !== null )
					{
						$(nTh).addClass( oSettings.aoColumns[i].sClass );
					}
					
					/* Set the title of the column if it is user defined (not what was auto detected) */
					if ( oSettings.aoColumns[i].sTitle != nTh.innerHTML )
					{
						nTh.innerHTML = oSettings.aoColumns[i].sTitle;
					}
				}
			}
			else
			{
				/* We don't have a header in the DOM - so we are going to have to create one */
				var nTr = document.createElement( "tr" );
				
				for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
				{
					nTh = oSettings.aoColumns[i].nTh;
					nTh.innerHTML = oSettings.aoColumns[i].sTitle;
					
					if ( oSettings.aoColumns[i].sClass !== null )
					{
						$(nTh).addClass( oSettings.aoColumns[i].sClass );
					}
					
					nTr.appendChild( nTh );
				}
				$(oSettings.nTHead).html( '' )[0].appendChild( nTr );
				_fnDetectHeader( oSettings.aoHeader, oSettings.nTHead );
			}
			
			/* Add the extra markup needed by jQuery UI's themes */
			if ( oSettings.bJUI )
			{
				for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
				{
					nTh = oSettings.aoColumns[i].nTh;
					
					var nDiv = document.createElement('div');
					nDiv.className = oSettings.oClasses.sSortJUIWrapper;
					$(nTh).contents().appendTo(nDiv);
					
					var nSpan = document.createElement('span');
					nSpan.className = oSettings.oClasses.sSortIcon;
					nDiv.appendChild( nSpan );
					nTh.appendChild( nDiv );
				}
			}
			
			/* Add sort listener */
			var fnNoSelect = function (e) {
				this.onselectstart = function() { return false; };
				return false;
			};
			
			if ( oSettings.oFeatures.bSort )
			{
				for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
				{
					if ( oSettings.aoColumns[i].bSortable !== false )
					{
						_fnSortAttachListener( oSettings, oSettings.aoColumns[i].nTh, i );
						
						/* Take the brutal approach to cancelling text selection in header */
						$(oSettings.aoColumns[i].nTh).bind( 'mousedown.DT', fnNoSelect );
					}
					else
					{
						$(oSettings.aoColumns[i].nTh).addClass( oSettings.oClasses.sSortableNone );
					}
				}
			}
			
			/* Deal with the footer - add classes if required */
			if ( oSettings.oClasses.sFooterTH !== "" )
			{
				$('>tr>th', oSettings.nTFoot).addClass( oSettings.oClasses.sFooterTH );
			}
			
			/* Cache the footer elements */
			if ( oSettings.nTFoot !== null )
			{
				var anCells = _fnGetUniqueThs( oSettings, null, oSettings.aoFooter );
				for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
				{
					if ( typeof anCells[i] != 'undefined' )
					{
						oSettings.aoColumns[i].nTf = anCells[i];
					}
				}
			}
		}

		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Drawing functions
		 */
		
		/*
		 * Function: _fnDrawHead
		 * Purpose:  Draw the header (or footer) element based on the column visibility states. The
		 *           methodology here is to use the layout array from _fnDetectHeader, modified for
		 *           the instantaneous column visibility, to construct the new layout. The grid is
		 *           traversed over cell at a time in a rows x columns grid fashion, although each 
		 *           cell insert can cover multiple elements in the grid - which is tracks using the
		 *           aApplied array. Cell inserts in the grid will only occur where there isn't
		 *           already a cell in that position.
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           array objects:aoSource - Layout array from _fnDetectHeader
		 *           boolean:bIncludeHidden - If true then include the hidden columns in the calc, 
		 *             - optional: default false
		 */
		function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
		{
			var i, iLen, j, jLen, k, kLen;
			var aoLocal = [];
			var aApplied = [];
			var iColumns = oSettings.aoColumns.length;
			var iRowspan, iColspan;

			if ( typeof bIncludeHidden == 'undefined' )
			{
				bIncludeHidden = false;
			}

			/* Make a copy of the master layout array, but without the visible columns in it */
			for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
			{
				aoLocal[i] = aoSource[i].slice();
				aoLocal[i].nTr = aoSource[i].nTr;

				/* Remove any columns which are currently hidden */
				for ( j=iColumns-1 ; j>=0 ; j-- )
				{
					if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
					{
						aoLocal[i].splice( j, 1 );
					}
				}

				/* Prep the applied array - it needs an element for each row */
				aApplied.push( [] );
			}

			for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
			{
				/* All cells are going to be replaced, so empty out the row */
				if ( aoLocal[i].nTr )
				{
					for ( k=0, kLen=aoLocal[i].nTr.childNodes.length ; k<kLen ; k++ )
					{
						aoLocal[i].nTr.removeChild( aoLocal[i].nTr.childNodes[0] );
					}
				}

				for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
				{
					iRowspan = 1;
					iColspan = 1;

					/* Check to see if there is already a cell (row/colspan) covering our target
					 * insert point. If there is, then there is nothing to do.
					 */
					if ( typeof aApplied[i][j] == 'undefined' )
					{
						aoLocal[i].nTr.appendChild( aoLocal[i][j].cell );
						aApplied[i][j] = 1;

						/* Expand the cell to cover as many rows as needed */
						while ( typeof aoLocal[i+iRowspan] != 'undefined' &&
						        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
						{
							aApplied[i+iRowspan][j] = 1;
							iRowspan++;
						}

						/* Expand the cell to cover as many columns as needed */
						while ( typeof aoLocal[i][j+iColspan] != 'undefined' &&
						        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
						{
							/* Must update the applied array over the rows for the columns */
							for ( k=0 ; k<iRowspan ; k++ )
							{
								aApplied[i+k][j+iColspan] = 1;
							}
							iColspan++;
						}

						/* Do the actual expansion in the DOM */
						aoLocal[i][j].cell.setAttribute('rowspan', iRowspan);
						aoLocal[i][j].cell.setAttribute('colspan', iColspan);
					}
				}
			}
		}
		
		/*
		 * Function: _fnDraw
		 * Purpose:  Insert the required TR nodes into the table for display
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnDraw( oSettings )
		{
			var i, iLen;
			var anRows = [];
			var iRowCount = 0;
			var bRowError = false;
			var iStrips = oSettings.asStripClasses.length;
			var iOpenRows = oSettings.aoOpenRows.length;
			
			/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
			if ( oSettings.fnPreDrawCallback !== null &&
			     oSettings.fnPreDrawCallback.call( oSettings.oInstance, oSettings ) === false )
			{
			     return;
			}
			
			oSettings.bDrawing = true;
			
			/* Check and see if we have an initial draw position from state saving */
			if ( typeof oSettings.iInitDisplayStart != 'undefined' && oSettings.iInitDisplayStart != -1 )
			{
				if ( oSettings.oFeatures.bServerSide )
				{
					oSettings._iDisplayStart = oSettings.iInitDisplayStart;
				}
				else
				{
					oSettings._iDisplayStart = (oSettings.iInitDisplayStart >= oSettings.fnRecordsDisplay()) ?
						0 : oSettings.iInitDisplayStart;
				}
				oSettings.iInitDisplayStart = -1;
				_fnCalculateEnd( oSettings );
			}
			
			/* Server-side processing draw intercept */
			if ( oSettings.bDeferLoading )
			{
				oSettings.bDeferLoading = false;
				oSettings.iDraw++;
			}
			else if ( !oSettings.oFeatures.bServerSide )
			{
				oSettings.iDraw++;
			}
			else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
			{
				return;
			}
			
			if ( oSettings.aiDisplay.length !== 0 )
			{
				var iStart = oSettings._iDisplayStart;
				var iEnd = oSettings._iDisplayEnd;
				
				if ( oSettings.oFeatures.bServerSide )
				{
					iStart = 0;
					iEnd = oSettings.aoData.length;
				}
				
				for ( var j=iStart ; j<iEnd ; j++ )
				{
					var aoData = oSettings.aoData[ oSettings.aiDisplay[j] ];
					if ( aoData.nTr === null )
					{
						_fnCreateTr( oSettings, oSettings.aiDisplay[j] );
					}

					var nRow = aoData.nTr;
					
					/* Remove the old stripping classes and then add the new one */
					if ( iStrips !== 0 )
					{
						var sStrip = oSettings.asStripClasses[ iRowCount % iStrips ];
						if ( aoData._sRowStripe != sStrip )
						{
							$(nRow).removeClass( aoData._sRowStripe ).addClass( sStrip );
							aoData._sRowStripe = sStrip;
						}
					}
					
					/* Custom row callback function - might want to manipule the row */
					if ( typeof oSettings.fnRowCallback == "function" )
					{
						nRow = oSettings.fnRowCallback.call( oSettings.oInstance, nRow, 
							oSettings.aoData[ oSettings.aiDisplay[j] ]._aData, iRowCount, j );
						if ( !nRow && !bRowError )
						{
							_fnLog( oSettings, 0, "A node was not returned by fnRowCallback" );
							bRowError = true;
						}
					}
					
					anRows.push( nRow );
					iRowCount++;
					
					/* If there is an open row - and it is attached to this parent - attach it on redraw */
					if ( iOpenRows !== 0 )
					{
						for ( var k=0 ; k<iOpenRows ; k++ )
						{
							if ( nRow == oSettings.aoOpenRows[k].nParent )
							{
								anRows.push( oSettings.aoOpenRows[k].nTr );
							}
						}
					}
				}
			}
			else
			{
				/* Table is empty - create a row with an empty message in it */
				anRows[ 0 ] = document.createElement( 'tr' );
				
				if ( typeof oSettings.asStripClasses[0] != 'undefined' )
				{
					anRows[ 0 ].className = oSettings.asStripClasses[0];
				}

				var sZero = oSettings.oLanguage.sZeroRecords.replace(
					'_MAX_', oSettings.fnFormatNumber(oSettings.fnRecordsTotal()) );
				if ( oSettings.iDraw == 1 && oSettings.sAjaxSource !== null && !oSettings.oFeatures.bServerSide )
				{
					sZero = oSettings.oLanguage.sLoadingRecords;
				}
				else if ( typeof oSettings.oLanguage.sEmptyTable != 'undefined' &&
				     oSettings.fnRecordsTotal() === 0 )
				{
					sZero = oSettings.oLanguage.sEmptyTable;
				}

				var nTd = document.createElement( 'td' );
				nTd.setAttribute( 'valign', "top" );
				nTd.colSpan = _fnVisbleColumns( oSettings );
				nTd.className = oSettings.oClasses.sRowEmpty;
				nTd.innerHTML = sZero;
				
				anRows[ iRowCount ].appendChild( nTd );
			}
			
			/* Callback the header and footer custom funcation if there is one */
			if ( typeof oSettings.fnHeaderCallback == 'function' )
			{
				oSettings.fnHeaderCallback.call( oSettings.oInstance, $('>tr', oSettings.nTHead)[0], 
					_fnGetDataMaster( oSettings ), oSettings._iDisplayStart, oSettings.fnDisplayEnd(),
					oSettings.aiDisplay );
			}
			
			if ( typeof oSettings.fnFooterCallback == 'function' )
			{
				oSettings.fnFooterCallback.call( oSettings.oInstance, $('>tr', oSettings.nTFoot)[0], 
					_fnGetDataMaster( oSettings ), oSettings._iDisplayStart, oSettings.fnDisplayEnd(),
					oSettings.aiDisplay );
			}
			
			/* 
			 * Need to remove any old row from the display - note we can't just empty the tbody using
			 * $().html('') since this will unbind the jQuery event handlers (even although the node 
			 * still exists!) - equally we can't use innerHTML, since IE throws an exception.
			 */
			var
				nAddFrag = document.createDocumentFragment(),
				nRemoveFrag = document.createDocumentFragment(),
				nBodyPar, nTrs;
			
			if ( oSettings.nTBody )
			{
				nBodyPar = oSettings.nTBody.parentNode;
				nRemoveFrag.appendChild( oSettings.nTBody );
				
				/* When doing infinite scrolling, only remove child rows when sorting, filtering or start
				 * up. When not infinite scroll, always do it.
				 */
				if ( !oSettings.oScroll.bInfinite || !oSettings._bInitComplete ||
				 	oSettings.bSorted || oSettings.bFiltered )
				{
					nTrs = oSettings.nTBody.childNodes;
					for ( i=nTrs.length-1 ; i>=0 ; i-- )
					{
						nTrs[i].parentNode.removeChild( nTrs[i] );
					}
				}
				
				/* Put the draw table into the dom */
				for ( i=0, iLen=anRows.length ; i<iLen ; i++ )
				{
					nAddFrag.appendChild( anRows[i] );
				}
				
				oSettings.nTBody.appendChild( nAddFrag );
				if ( nBodyPar !== null )
				{
					nBodyPar.appendChild( oSettings.nTBody );
				}
			}
			
			/* Call all required callback functions for the end of a draw */
			for ( i=oSettings.aoDrawCallback.length-1 ; i>=0 ; i-- )
			{
				oSettings.aoDrawCallback[i].fn.call( oSettings.oInstance, oSettings );
			}
			
			/* Draw is complete, sorting and filtering must be as well */
			oSettings.bSorted = false;
			oSettings.bFiltered = false;
			oSettings.bDrawing = false;
			
			if ( oSettings.oFeatures.bServerSide )
			{
				_fnProcessingDisplay( oSettings, false );
				if ( typeof oSettings._bInitComplete == 'undefined' )
				{
					_fnInitComplete( oSettings );
				}
			}
		}
		
		/*
		 * Function: _fnReDraw
		 * Purpose:  Redraw the table - taking account of the various features which are enabled
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnReDraw( oSettings )
		{
			if ( oSettings.oFeatures.bSort )
			{
				/* Sorting will refilter and draw for us */
				_fnSort( oSettings, oSettings.oPreviousSearch );
			}
			else if ( oSettings.oFeatures.bFilter )
			{
				/* Filtering will redraw for us */
				_fnFilterComplete( oSettings, oSettings.oPreviousSearch );
			}
			else
			{
				_fnCalculateEnd( oSettings );
				_fnDraw( oSettings );
			}
		}
		
		/*
		 * Function: _fnAjaxUpdate
		 * Purpose:  Update the table using an Ajax call
		 * Returns:  bool: block the table drawing or not
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnAjaxUpdate( oSettings )
		{
			if ( oSettings.bAjaxDataGet )
			{
				_fnProcessingDisplay( oSettings, true );
				var iColumns = oSettings.aoColumns.length;
				var aoData = [], mDataProp;
				var i;
				
				/* Paging and general */
				oSettings.iDraw++;
				aoData.push( { "name": "sEcho",          "value": oSettings.iDraw } );
				aoData.push( { "name": "iColumns",       "value": iColumns } );
				aoData.push( { "name": "sColumns",       "value": _fnColumnOrdering(oSettings) } );
				aoData.push( { "name": "iDisplayStart",  "value": oSettings._iDisplayStart } );
				aoData.push( { "name": "iDisplayLength", "value": oSettings.oFeatures.bPaginate !== false ?
					oSettings._iDisplayLength : -1 } );
					
				for ( i=0 ; i<iColumns ; i++ )
				{
				  mDataProp = oSettings.aoColumns[i].mDataProp;
					aoData.push( { "name": "mDataProp_"+i, "value": typeof(mDataProp)=="function" ? 'function' : mDataProp } );
				}
				
				/* Filtering */
				if ( oSettings.oFeatures.bFilter !== false )
				{
					aoData.push( { "name": "sSearch", "value": oSettings.oPreviousSearch.sSearch } );
					aoData.push( { "name": "bRegex",  "value": oSettings.oPreviousSearch.bRegex } );
					for ( i=0 ; i<iColumns ; i++ )
					{
						aoData.push( { "name": "sSearch_"+i,     "value": oSettings.aoPreSearchCols[i].sSearch } );
						aoData.push( { "name": "bRegex_"+i,      "value": oSettings.aoPreSearchCols[i].bRegex } );
						aoData.push( { "name": "bSearchable_"+i, "value": oSettings.aoColumns[i].bSearchable } );
					}
				}
				
				/* Sorting */
				if ( oSettings.oFeatures.bSort !== false )
				{
					var iFixed = oSettings.aaSortingFixed !== null ? oSettings.aaSortingFixed.length : 0;
					var iUser = oSettings.aaSorting.length;
					aoData.push( { "name": "iSortingCols",   "value": iFixed+iUser } );
					for ( i=0 ; i<iFixed ; i++ )
					{
						aoData.push( { "name": "iSortCol_"+i,  "value": oSettings.aaSortingFixed[i][0] } );
						aoData.push( { "name": "sSortDir_"+i,  "value": oSettings.aaSortingFixed[i][1] } );
					}
					
					for ( i=0 ; i<iUser ; i++ )
					{
						aoData.push( { "name": "iSortCol_"+(i+iFixed),  "value": oSettings.aaSorting[i][0] } );
						aoData.push( { "name": "sSortDir_"+(i+iFixed),  "value": oSettings.aaSorting[i][1] } );
					}
					
					for ( i=0 ; i<iColumns ; i++ )
					{
						aoData.push( { "name": "bSortable_"+i,  "value": oSettings.aoColumns[i].bSortable } );
					}
				}
				
				oSettings.fnServerData.call( oSettings.oInstance, oSettings.sAjaxSource, aoData,
					function(json) {
						_fnAjaxUpdateDraw( oSettings, json );
					}, oSettings );
				return false;
			}
			else
			{
				return true;
			}
		}
		
		/*
		 * Function: _fnAjaxUpdateDraw
		 * Purpose:  Data the data from the server (nuking the old) and redraw the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           object:json - json data return from the server.
		 *             The following must be defined:
		 *               iTotalRecords, iTotalDisplayRecords, aaData
		 *             The following may be defined:
		 *               sColumns
		 */
		function _fnAjaxUpdateDraw ( oSettings, json )
		{
			if ( typeof json.sEcho != 'undefined' )
			{
				/* Protect against old returns over-writing a new one. Possible when you get
				 * very fast interaction, and later queires are completed much faster
				 */
				if ( json.sEcho*1 < oSettings.iDraw )
				{
					return;
				}
				else
				{
					oSettings.iDraw = json.sEcho * 1;
				}
			}
			
			if ( !oSettings.oScroll.bInfinite ||
				   (oSettings.oScroll.bInfinite && (oSettings.bSorted || oSettings.bFiltered)) )
			{
				_fnClearTable( oSettings );
			}
			oSettings._iRecordsTotal = json.iTotalRecords;
			oSettings._iRecordsDisplay = json.iTotalDisplayRecords;
			
			/* Determine if reordering is required */
			var sOrdering = _fnColumnOrdering(oSettings);
			var bReOrder = (typeof json.sColumns != 'undefined' && sOrdering !== "" && json.sColumns != sOrdering );
			if ( bReOrder )
			{
				var aiIndex = _fnReOrderIndex( oSettings, json.sColumns );
			}

			var fnDataSrc = _fnGetObjectDataFn( oSettings.sAjaxDataProp );
			var aData = fnDataSrc( json );
			
			for ( var i=0, iLen=aData.length ; i<iLen ; i++ )
			{
				if ( bReOrder )
				{
					/* If we need to re-order, then create a new array with the correct order and add it */
					var aDataSorted = [];
					for ( var j=0, jLen=oSettings.aoColumns.length ; j<jLen ; j++ )
					{
						aDataSorted.push( aData[i][ aiIndex[j] ] );
					}
					_fnAddData( oSettings, aDataSorted );
				}
				else
				{
					/* No re-order required, sever got it "right" - just straight add */
					_fnAddData( oSettings, aData[i] );
				}
			}
			oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
			oSettings.bAjaxDataGet = false;
			_fnDraw( oSettings );
			oSettings.bAjaxDataGet = true;
			_fnProcessingDisplay( oSettings, false );
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Options (features) HTML
		 */
		
		/*
		 * Function: _fnAddOptionsHtml
		 * Purpose:  Add the options to the page HTML for the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnAddOptionsHtml ( oSettings )
		{
			/*
			 * Create a temporary, empty, div which we can later on replace with what we have generated
			 * we do it this way to rendering the 'options' html offline - speed :-)
			 */
			var nHolding = document.createElement( 'div' );
			oSettings.nTable.parentNode.insertBefore( nHolding, oSettings.nTable );
			
			/* 
			 * All DataTables are wrapped in a div
			 */
			oSettings.nTableWrapper = document.createElement( 'div' );
			oSettings.nTableWrapper.className = oSettings.oClasses.sWrapper;
			if ( oSettings.sTableId !== '' )
			{
				oSettings.nTableWrapper.setAttribute( 'id', oSettings.sTableId+'_wrapper' );
			}

			oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;

			/* Track where we want to insert the option */
			var nInsertNode = oSettings.nTableWrapper;
			
			/* Loop over the user set positioning and place the elements as needed */
			var aDom = oSettings.sDom.split('');
			var nTmp, iPushFeature, cOption, nNewNode, cNext, sAttr, j;
			for ( var i=0 ; i<aDom.length ; i++ )
			{
				iPushFeature = 0;
				cOption = aDom[i];
				
				if ( cOption == '<' )
				{
					/* New container div */
					nNewNode = document.createElement( 'div' );
					
					/* Check to see if we should append an id and/or a class name to the container */
					cNext = aDom[i+1];
					if ( cNext == "'" || cNext == '"' )
					{
						sAttr = "";
						j = 2;
						while ( aDom[i+j] != cNext )
						{
							sAttr += aDom[i+j];
							j++;
						}
						
						/* Replace jQuery UI constants */
						if ( sAttr == "H" )
						{
							sAttr = "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix";
						}
						else if ( sAttr == "F" )
						{
							sAttr = "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix";
						}
						
						/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
						 * breaks the string into parts and applies them as needed
						 */
						if ( sAttr.indexOf('.') != -1 )
						{
							var aSplit = sAttr.split('.');
							nNewNode.setAttribute('id', aSplit[0].substr(1, aSplit[0].length-1) );
							nNewNode.className = aSplit[1];
						}
						else if ( sAttr.charAt(0) == "#" )
						{
							nNewNode.setAttribute('id', sAttr.substr(1, sAttr.length-1) );
						}
						else
						{
							nNewNode.className = sAttr;
						}
						
						i += j; /* Move along the position array */
					}
					
					nInsertNode.appendChild( nNewNode );
					nInsertNode = nNewNode;
				}
				else if ( cOption == '>' )
				{
					/* End container div */
					nInsertNode = nInsertNode.parentNode;
				}
				else if ( cOption == 'l' && oSettings.oFeatures.bPaginate && oSettings.oFeatures.bLengthChange )
				{
					/* Length */
					nTmp = _fnFeatureHtmlLength( oSettings );
					iPushFeature = 1;
				}
				else if ( cOption == 'f' && oSettings.oFeatures.bFilter )
				{
					/* Filter */
					nTmp = _fnFeatureHtmlFilter( oSettings );
					iPushFeature = 1;
				}
				else if ( cOption == 'r' && oSettings.oFeatures.bProcessing )
				{
					/* pRocessing */
					nTmp = _fnFeatureHtmlProcessing( oSettings );
					iPushFeature = 1;
				}
				else if ( cOption == 't' )
				{
					/* Table */
					nTmp = _fnFeatureHtmlTable( oSettings );
					iPushFeature = 1;
				}
				else if ( cOption ==  'i' && oSettings.oFeatures.bInfo )
				{
					/* Info */
					nTmp = _fnFeatureHtmlInfo( oSettings );
					iPushFeature = 1;
				}
				else if ( cOption == 'p' && oSettings.oFeatures.bPaginate )
				{
					/* Pagination */
					nTmp = _fnFeatureHtmlPaginate( oSettings );
					iPushFeature = 1;
				}
				else if ( _oExt.aoFeatures.length !== 0 )
				{
					/* Plug-in features */
					var aoFeatures = _oExt.aoFeatures;
					for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
					{
						if ( cOption == aoFeatures[k].cFeature )
						{
							nTmp = aoFeatures[k].fnInit( oSettings );
							if ( nTmp )
							{
								iPushFeature = 1;
							}
							break;
						}
					}
				}
				
				/* Add to the 2D features array */
				if ( iPushFeature == 1 && nTmp !== null )
				{
					if ( typeof oSettings.aanFeatures[cOption] != 'object' )
					{
						oSettings.aanFeatures[cOption] = [];
					}
					oSettings.aanFeatures[cOption].push( nTmp );
					nInsertNode.appendChild( nTmp );
				}
			}
			
			/* Built our DOM structure - replace the holding div with what we want */
			nHolding.parentNode.replaceChild( oSettings.nTableWrapper, nHolding );
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: Filtering
		 */
		
		/*
		 * Function: _fnFeatureHtmlTable
		 * Purpose:  Add any control elements for the table - specifically scrolling
		 * Returns:  node: - Node to add to the DOM
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFeatureHtmlTable ( oSettings )
		{
			/* Chack if scrolling is enabled or not - if not then leave the DOM unaltered */
			if ( oSettings.oScroll.sX === "" && oSettings.oScroll.sY === "" )
			{
				return oSettings.nTable;
			}
			
			/*
			 * The HTML structure that we want to generate in this function is:
			 *  div - nScroller
			 *    div - nScrollHead
			 *      div - nScrollHeadInner
			 *        table - nScrollHeadTable
			 *          thead - nThead
			 *    div - nScrollBody
			 *      table - oSettings.nTable
			 *        thead - nTheadSize
			 *        tbody - nTbody
			 *    div - nScrollFoot
			 *      div - nScrollFootInner
			 *        table - nScrollFootTable
			 *          tfoot - nTfoot
			 */
			var
			 	nScroller = document.createElement('div'),
			 	nScrollHead = document.createElement('div'),
			 	nScrollHeadInner = document.createElement('div'),
			 	nScrollBody = document.createElement('div'),
			 	nScrollFoot = document.createElement('div'),
			 	nScrollFootInner = document.createElement('div'),
			 	nScrollHeadTable = oSettings.nTable.cloneNode(false),
			 	nScrollFootTable = oSettings.nTable.cloneNode(false),
				nThead = oSettings.nTable.getElementsByTagName('thead')[0],
			 	nTfoot = oSettings.nTable.getElementsByTagName('tfoot').length === 0 ? null : 
					oSettings.nTable.getElementsByTagName('tfoot')[0],
				oClasses = (typeof oInit.bJQueryUI != 'undefined' && oInit.bJQueryUI) ?
					_oExt.oJUIClasses : _oExt.oStdClasses;
			
			nScrollHead.appendChild( nScrollHeadInner );
			nScrollFoot.appendChild( nScrollFootInner );
			nScrollBody.appendChild( oSettings.nTable );
			nScroller.appendChild( nScrollHead );
			nScroller.appendChild( nScrollBody );
			nScrollHeadInner.appendChild( nScrollHeadTable );
			nScrollHeadTable.appendChild( nThead );
			if ( nTfoot !== null )
			{
				nScroller.appendChild( nScrollFoot );
				nScrollFootInner.appendChild( nScrollFootTable );
				nScrollFootTable.appendChild( nTfoot );
			}
			
			nScroller.className = oClasses.sScrollWrapper;
			nScrollHead.className = oClasses.sScrollHead;
			nScrollHeadInner.className = oClasses.sScrollHeadInner;
			nScrollBody.className = oClasses.sScrollBody;
			nScrollFoot.className = oClasses.sScrollFoot;
			nScrollFootInner.className = oClasses.sScrollFootInner;
			
			if ( oSettings.oScroll.bAutoCss )
			{
				nScrollHead.style.overflow = "hidden";
				nScrollHead.style.position = "relative";
				nScrollFoot.style.overflow = "hidden";
				nScrollBody.style.overflow = "auto";
			}
			
			nScrollHead.style.border = "0";
			nScrollHead.style.width = "100%";
			nScrollFoot.style.border = "0";
			nScrollHeadInner.style.width = "150%"; /* will be overwritten */
			
			/* Modify attributes to respect the clones */
			nScrollHeadTable.removeAttribute('id');
			nScrollHeadTable.style.marginLeft = "0";
			oSettings.nTable.style.marginLeft = "0";
			if ( nTfoot !== null )
			{
				nScrollFootTable.removeAttribute('id');
				nScrollFootTable.style.marginLeft = "0";
			}
			
			/* Move any caption elements from the body to the header */
			var nCaptions = $('>caption', oSettings.nTable);
			for ( var i=0, iLen=nCaptions.length ; i<iLen ; i++ )
			{
				nScrollHeadTable.appendChild( nCaptions[i] );
			}
			
			/*
			 * Sizing
			 */
			/* When xscrolling add the width and a scroller to move the header with the body */
			if ( oSettings.oScroll.sX !== "" )
			{
				nScrollHead.style.width = _fnStringToCss( oSettings.oScroll.sX );
				nScrollBody.style.width = _fnStringToCss( oSettings.oScroll.sX );
				
				if ( nTfoot !== null )
				{
					nScrollFoot.style.width = _fnStringToCss( oSettings.oScroll.sX );	
				}
				
				/* When the body is scrolled, then we also want to scroll the headers */
				$(nScrollBody).scroll( function (e) {
					nScrollHead.scrollLeft = this.scrollLeft;
					
					if ( nTfoot !== null )
					{
						nScrollFoot.scrollLeft = this.scrollLeft;
					}
				} );
			}
			
			/* When yscrolling, add the height */
			if ( oSettings.oScroll.sY !== "" )
			{
				nScrollBody.style.height = _fnStringToCss( oSettings.oScroll.sY );
			}
			
			/* Redraw - align columns across the tables */
			oSettings.aoDrawCallback.push( {
				"fn": _fnScrollDraw,
				"sName": "scrolling"
			} );
			
			/* Infinite scrolling event handlers */
			if ( oSettings.oScroll.bInfinite )
			{
				$(nScrollBody).scroll( function() {
					/* Use a blocker to stop scrolling from loading more data while other data is still loading */
					if ( !oSettings.bDrawing )
					{
						/* Check if we should load the next data set */
						if ( $(this).scrollTop() + $(this).height() > 
							$(oSettings.nTable).height() - oSettings.oScroll.iLoadGap )
						{
							/* Only do the redraw if we have to - we might be at the end of the data */
							if ( oSettings.fnDisplayEnd() < oSettings.fnRecordsDisplay() )
							{
								_fnPageChange( oSettings, 'next' );
								_fnCalculateEnd( oSettings );
								_fnDraw( oSettings );
							}
						}
					}
				} );
			}
			
			oSettings.nScrollHead = nScrollHead;
			oSettings.nScrollFoot = nScrollFoot;
			
			return nScroller;
		}
		
		/*
		 * Function: _fnScrollDraw
		 * Purpose:  Update the various tables for resizing
		 * Returns:  node: - Node to add to the DOM
		 * Inputs:   object:o - dataTables settings object
		 * Notes:    It's a bit of a pig this function, but basically the idea to:
		 *   1. Re-create the table inside the scrolling div
		 *   2. Take live measurements from the DOM
		 *   3. Apply the measurements
		 *   4. Clean up
		 */
		function _fnScrollDraw ( o )
		{
			var
				nScrollHeadInner = o.nScrollHead.getElementsByTagName('div')[0],
				nScrollHeadTable = nScrollHeadInner.getElementsByTagName('table')[0],
				nScrollBody = o.nTable.parentNode,
				i, iLen, j, jLen, anHeadToSize, anHeadSizers, anFootSizers, anFootToSize, oStyle, iVis,
				iWidth, aApplied=[], iSanityWidth;
			
			/*
			 * 1. Re-create the table inside the scrolling div
			 */
			
			/* Remove the old minimised thead and tfoot elements in the inner table */
			var nTheadSize = o.nTable.getElementsByTagName('thead');
			if ( nTheadSize.length > 0 )
			{
				o.nTable.removeChild( nTheadSize[0] );
			}
			
			if ( o.nTFoot !== null )
			{
				/* Remove the old minimised footer element in the cloned header */
				var nTfootSize = o.nTable.getElementsByTagName('tfoot');
				if ( nTfootSize.length > 0 )
				{
					o.nTable.removeChild( nTfootSize[0] );
				}
			}
			
			/* Clone the current header and footer elements and then place it into the inner table */
			nTheadSize = o.nTHead.cloneNode(true);
			o.nTable.insertBefore( nTheadSize, o.nTable.childNodes[0] );
			
			if ( o.nTFoot !== null )
			{
				nTfootSize = o.nTFoot.cloneNode(true);
				o.nTable.insertBefore( nTfootSize, o.nTable.childNodes[1] );
			}
			
			/*
			 * 2. Take live measurements from the DOM - do not alter the DOM itself!
			 */
			
			/* Remove old sizing and apply the calculated column widths
			 * Get the unique column headers in the newly created (cloned) header. We want to apply the
			 * calclated sizes to this header
			 */
			if ( o.oScroll.sX === "" )
			{
				nScrollBody.style.width = '100%';
				nScrollHeadInner.parentNode.style.width = '100%';
			}
			
			var nThs = _fnGetUniqueThs( o, nTheadSize );
			for ( i=0, iLen=nThs.length ; i<iLen ; i++ )
			{
				iVis = _fnVisibleToColumnIndex( o, i );
				nThs[i].style.width = o.aoColumns[iVis].sWidth;
			}
			
			if ( o.nTFoot !== null )
			{
				_fnApplyToChildren( function(n) {
					n.style.width = "";
				}, nTfootSize.getElementsByTagName('tr') );
			}
			
			/* Size the table as a whole */
			iSanityWidth = $(o.nTable).outerWidth();
			if ( o.oScroll.sX === "" )
			{
				/* No x scrolling */
				o.nTable.style.width = "100%";
				
				/* I know this is rubbish - but IE7 will make the width of the table when 100% include
				 * the scrollbar - which is shouldn't. This needs feature detection in future - to do
				 */
				if ( $.browser.msie && $.browser.version <= 7 )
				{
					o.nTable.style.width = _fnStringToCss( $(o.nTable).outerWidth()-o.oScroll.iBarWidth );
				}
			}
			else
			{
				if ( o.oScroll.sXInner !== "" )
				{
					/* x scroll inner has been given - use it */
					o.nTable.style.width = _fnStringToCss(o.oScroll.sXInner);
				}
				else if ( iSanityWidth == $(nScrollBody).width() &&
				   $(nScrollBody).height() < $(o.nTable).height() )
				{
					/* There is y-scrolling - try to take account of the y scroll bar */
					o.nTable.style.width = _fnStringToCss( iSanityWidth-o.oScroll.iBarWidth );
					if ( $(o.nTable).outerWidth() > iSanityWidth-o.oScroll.iBarWidth )
					{
						/* Not possible to take account of it */
						o.nTable.style.width = _fnStringToCss( iSanityWidth );
					}
				}
				else
				{
					/* All else fails */
					o.nTable.style.width = _fnStringToCss( iSanityWidth );
				}
			}
			
			/* Recalculate the sanity width - now that we've applied the required width, before it was
			 * a temporary variable. This is required because the column width calculation is done
			 * before this table DOM is created.
			 */
			iSanityWidth = $(o.nTable).outerWidth();
			
			/* If x-scrolling is disabled, then the viewport cannot be less than the sanity width */
			if ( o.oScroll.sX === "" )
			{
				nScrollBody.style.width = _fnStringToCss( iSanityWidth+o.oScroll.iBarWidth );
				nScrollHeadInner.parentNode.style.width = _fnStringToCss( iSanityWidth+o.oScroll.iBarWidth );
			}
			
			/* We want the hidden header to have zero height, so remove padding and borders. Then
			 * set the width based on the real headers
			 */
			anHeadToSize = o.nTHead.getElementsByTagName('tr');
			anHeadSizers = nTheadSize.getElementsByTagName('tr');
			
			_fnApplyToChildren( function(nSizer, nToSize) {
				oStyle = nSizer.style;
				oStyle.paddingTop = "0";
				oStyle.paddingBottom = "0";
				oStyle.borderTopWidth = "0";
				oStyle.borderBottomWidth = "0";
				oStyle.height = 0;
				
				iWidth = $(nSizer).width();
				nToSize.style.width = _fnStringToCss( iWidth );
				aApplied.push( iWidth );
			}, anHeadSizers, anHeadToSize );
			$(anHeadSizers).height(0);
			
			if ( o.nTFoot !== null )
			{
				/* Clone the current footer and then place it into the body table as a "hidden header" */
				anFootSizers = nTfootSize.getElementsByTagName('tr');
				anFootToSize = o.nTFoot.getElementsByTagName('tr');
				
				_fnApplyToChildren( function(nSizer, nToSize) {
					oStyle = nSizer.style;
					oStyle.paddingTop = "0";
					oStyle.paddingBottom = "0";
					oStyle.borderTopWidth = "0";
					oStyle.borderBottomWidth = "0";
					oStyle.height = 0;
					
					iWidth = $(nSizer).width();
					nToSize.style.width = _fnStringToCss( iWidth );
					aApplied.push( iWidth );
				}, anFootSizers, anFootToSize );
				$(anFootSizers).height(0);
			}
			
			/*
			 * 3. Apply the measurements
			 */
			
			/* "Hide" the header and footer that we used for the sizing. We want to also fix their width
			 * to what they currently are
			 */
			_fnApplyToChildren( function(nSizer) {
				nSizer.innerHTML = "";
				nSizer.style.width = _fnStringToCss( aApplied.shift() );
			}, anHeadSizers );
			
			if ( o.nTFoot !== null )
			{
				_fnApplyToChildren( function(nSizer) {
					nSizer.innerHTML = "";
					nSizer.style.width = _fnStringToCss( aApplied.shift() );
				}, anFootSizers );
			}
			
			/* Sanity check that the table is of a sensible width. If not then we are going to get
			 * misalignment
			 */
			if ( $(o.nTable).outerWidth() < iSanityWidth )
			{
				if ( o.oScroll.sX === "" )
				{
					_fnLog( o, 1, "The table cannot fit into the current element which will cause column"+
						" misalignment. It is suggested that you enable x-scrolling or increase the width"+
						" the table has in which to be drawn" );
				}
				else if ( o.oScroll.sXInner !== "" )
				{
					_fnLog( o, 1, "The table cannot fit into the current element which will cause column"+
						" misalignment. It is suggested that you increase the sScrollXInner property to"+
						" allow it to draw in a larger area, or simply remove that parameter to allow"+
						" automatic calculation" );
				}
			}
			
			
			/*
			 * 4. Clean up
			 */
			
			if ( o.oScroll.sY === "" )
			{
				/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
				 * the scrollbar height from the visible display, rather than adding it on. We need to
				 * set the height in order to sort this. Don't want to do it in any other browsers.
				 */
				if ( $.browser.msie && $.browser.version <= 7 )
				{
					nScrollBody.style.height = _fnStringToCss( o.nTable.offsetHeight+o.oScroll.iBarWidth );
				}
			}
			
			if ( o.oScroll.sY !== "" && o.oScroll.bCollapse )
			{
				nScrollBody.style.height = _fnStringToCss( o.oScroll.sY );
				
				var iExtra = (o.oScroll.sX !== "" && o.nTable.offsetWidth > nScrollBody.offsetWidth) ?
				 	o.oScroll.iBarWidth : 0;
				if ( o.nTable.offsetHeight < nScrollBody.offsetHeight )
				{
					nScrollBody.style.height = _fnStringToCss( $(o.nTable).height()+iExtra );
				}
			}
			
			/* Finally set the width's of the header and footer tables */
			var iOuterWidth = $(o.nTable).outerWidth();
			nScrollHeadTable.style.width = _fnStringToCss( iOuterWidth );
			nScrollHeadInner.style.width = _fnStringToCss( iOuterWidth+o.oScroll.iBarWidth );
			
			if ( o.nTFoot !== null )
			{
				var
					nScrollFootInner = o.nScrollFoot.getElementsByTagName('div')[0],
					nScrollFootTable = nScrollFootInner.getElementsByTagName('table')[0];
				
				nScrollFootInner.style.width = _fnStringToCss( o.nTable.offsetWidth+o.oScroll.iBarWidth );
				nScrollFootTable.style.width = _fnStringToCss( o.nTable.offsetWidth );
			}
			
			/* If sorting or filtering has occured, jump the scrolling back to the top */
			if ( o.bSorted || o.bFiltered )
			{
				nScrollBody.scrollTop = 0;
			}
		}
		
		/*
		 * Function: _fnAjustColumnSizing
		 * Purpose:  Ajust the table column widths for new data
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 * Notes:    You would probably want to do a redraw after calling this function!
		 */
		function _fnAjustColumnSizing ( oSettings )
		{
			/* Not interested in doing column width calculation if autowidth is disabled */
			if ( oSettings.oFeatures.bAutoWidth === false )
			{
				return false;
			}
			
			_fnCalculateColumnWidths( oSettings );
			for ( var i=0 , iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oSettings.aoColumns[i].nTh.style.width = oSettings.aoColumns[i].sWidth;
			}
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: Filtering
		 */
		
		/*
		 * Function: _fnFeatureHtmlFilter
		 * Purpose:  Generate the node required for filtering text
		 * Returns:  node
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFeatureHtmlFilter ( oSettings )
		{
			var sSearchStr = oSettings.oLanguage.sSearch;
			sSearchStr = (sSearchStr.indexOf('_INPUT_') !== -1) ?
			  sSearchStr.replace('_INPUT_', '<input type="text" />') :
			  sSearchStr==="" ? '<input type="text" />' : sSearchStr+' <input type="text" />';
			
			var nFilter = document.createElement( 'div' );
			nFilter.className = oSettings.oClasses.sFilter;
			nFilter.innerHTML = '<label>'+sSearchStr+'</label>';
			if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.f == "undefined" )
			{
				nFilter.setAttribute( 'id', oSettings.sTableId+'_filter' );
			}
			
			var jqFilter = $("input", nFilter);
			jqFilter.val( oSettings.oPreviousSearch.sSearch.replace('"','&quot;') );
			jqFilter.bind( 'keyup.DT', function(e) {
				/* Update all other filter input elements for the new display */
				var n = oSettings.aanFeatures.f;
				for ( var i=0, iLen=n.length ; i<iLen ; i++ )
				{
					if ( n[i] != this.parentNode )
					{
						$('input', n[i]).val( this.value );
					}
				}
				
				/* Now do the filter */
				if ( this.value != oSettings.oPreviousSearch.sSearch )
				{
					_fnFilterComplete( oSettings, { 
						"sSearch": this.value, 
						"bRegex":  oSettings.oPreviousSearch.bRegex,
						"bSmart":  oSettings.oPreviousSearch.bSmart 
					} );
				}
			} );
			
			jqFilter.bind( 'keypress.DT', function(e) {
				/* Prevent default */
				if ( e.keyCode == 13 )
				{
					return false;
				}
			} );
			
			return nFilter;
		}
		
		/*
		 * Function: _fnFilterComplete
		 * Purpose:  Filter the table using both the global filter and column based filtering
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           object:oSearch: search information
		 *           int:iForce - optional - force a research of the master array (1) or not (undefined or 0)
		 */
		function _fnFilterComplete ( oSettings, oInput, iForce )
		{
			/* Filter on everything */
			_fnFilter( oSettings, oInput.sSearch, iForce, oInput.bRegex, oInput.bSmart );
			
			/* Now do the individual column filter */
			for ( var i=0 ; i<oSettings.aoPreSearchCols.length ; i++ )
			{
				_fnFilterColumn( oSettings, oSettings.aoPreSearchCols[i].sSearch, i, 
					oSettings.aoPreSearchCols[i].bRegex, oSettings.aoPreSearchCols[i].bSmart );
			}
			
			/* Custom filtering */
			if ( _oExt.afnFiltering.length !== 0 )
			{
				_fnFilterCustom( oSettings );
			}
			
			/* Tell the draw function we have been filtering */
			oSettings.bFiltered = true;
			
			/* Redraw the table */
			oSettings._iDisplayStart = 0;
			_fnCalculateEnd( oSettings );
			_fnDraw( oSettings );
			
			/* Rebuild search array 'offline' */
			_fnBuildSearchArray( oSettings, 0 );
		}
		
		/*
		 * Function: _fnFilterCustom
		 * Purpose:  Apply custom filtering functions
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFilterCustom( oSettings )
		{
			var afnFilters = _oExt.afnFiltering;
			for ( var i=0, iLen=afnFilters.length ; i<iLen ; i++ )
			{
				var iCorrector = 0;
				for ( var j=0, jLen=oSettings.aiDisplay.length ; j<jLen ; j++ )
				{
					var iDisIndex = oSettings.aiDisplay[j-iCorrector];
					
					/* Check if we should use this row based on the filtering function */
					if ( !afnFilters[i]( oSettings, _fnGetRowData( oSettings, iDisIndex, 'filter' ), iDisIndex ) )
					{
						oSettings.aiDisplay.splice( j-iCorrector, 1 );
						iCorrector++;
					}
				}
			}
		}
		
		/*
		 * Function: _fnFilterColumn
		 * Purpose:  Filter the table on a per-column basis
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           string:sInput - string to filter on
		 *           int:iColumn - column to filter
		 *           bool:bRegex - treat search string as a regular expression or not
		 *           bool:bSmart - use smart filtering or not
		 */
		function _fnFilterColumn ( oSettings, sInput, iColumn, bRegex, bSmart )
		{
			if ( sInput === "" )
			{
				return;
			}
			
			var iIndexCorrector = 0;
			var rpSearch = _fnFilterCreateSearch( sInput, bRegex, bSmart );
			
			for ( var i=oSettings.aiDisplay.length-1 ; i>=0 ; i-- )
			{
				var sData = _fnDataToSearch( _fnGetCellData( oSettings, oSettings.aiDisplay[i], iColumn, 'filter' ),
					oSettings.aoColumns[iColumn].sType );
				if ( ! rpSearch.test( sData ) )
				{
					oSettings.aiDisplay.splice( i, 1 );
					iIndexCorrector++;
				}
			}
		}
		
		/*
		 * Function: _fnFilter
		 * Purpose:  Filter the data table based on user input and draw the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           string:sInput - string to filter on
		 *           int:iForce - optional - force a research of the master array (1) or not (undefined or 0)
		 *           bool:bRegex - treat as a regular expression or not
		 *           bool:bSmart - perform smart filtering or not
		 */
		function _fnFilter( oSettings, sInput, iForce, bRegex, bSmart )
		{
			var i;
			var rpSearch = _fnFilterCreateSearch( sInput, bRegex, bSmart );
			
			/* Check if we are forcing or not - optional parameter */
			if ( typeof iForce == 'undefined' || iForce === null )
			{
				iForce = 0;
			}
			
			/* Need to take account of custom filtering functions - always filter */
			if ( _oExt.afnFiltering.length !== 0 )
			{
				iForce = 1;
			}
			
			/*
			 * If the input is blank - we want the full data set
			 */
			if ( sInput.length <= 0 )
			{
				oSettings.aiDisplay.splice( 0, oSettings.aiDisplay.length);
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			}
			else
			{
				/*
				 * We are starting a new search or the new search string is smaller 
				 * then the old one (i.e. delete). Search from the master array
			 	 */
				if ( oSettings.aiDisplay.length == oSettings.aiDisplayMaster.length ||
					   oSettings.oPreviousSearch.sSearch.length > sInput.length || iForce == 1 ||
					   sInput.indexOf(oSettings.oPreviousSearch.sSearch) !== 0 )
				{
					/* Nuke the old display array - we are going to rebuild it */
					oSettings.aiDisplay.splice( 0, oSettings.aiDisplay.length);
					
					/* Force a rebuild of the search array */
					_fnBuildSearchArray( oSettings, 1 );
					
					/* Search through all records to populate the search array
					 * The the oSettings.aiDisplayMaster and asDataSearch arrays have 1 to 1 
					 * mapping
					 */
					for ( i=0 ; i<oSettings.aiDisplayMaster.length ; i++ )
					{
						if ( rpSearch.test(oSettings.asDataSearch[i]) )
						{
							oSettings.aiDisplay.push( oSettings.aiDisplayMaster[i] );
						}
					}
			  }
			  else
				{
			  	/* Using old search array - refine it - do it this way for speed
			  	 * Don't have to search the whole master array again
					 */
			  	var iIndexCorrector = 0;
			  	
			  	/* Search the current results */
			  	for ( i=0 ; i<oSettings.asDataSearch.length ; i++ )
					{
			  		if ( ! rpSearch.test(oSettings.asDataSearch[i]) )
						{
			  			oSettings.aiDisplay.splice( i-iIndexCorrector, 1 );
			  			iIndexCorrector++;
			  		}
			  	}
			  }
			}
			oSettings.oPreviousSearch.sSearch = sInput;
			oSettings.oPreviousSearch.bRegex = bRegex;
			oSettings.oPreviousSearch.bSmart = bSmart;
		}
		
		/*
		 * Function: _fnBuildSearchArray
		 * Purpose:  Create an array which can be quickly search through
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iMaster - use the master data array - optional
		 */
		function _fnBuildSearchArray ( oSettings, iMaster )
		{
			/* Clear out the old data */
			oSettings.asDataSearch.splice( 0, oSettings.asDataSearch.length );
			
			var aArray = (typeof iMaster != 'undefined' && iMaster == 1) ?
			 	oSettings.aiDisplayMaster : oSettings.aiDisplay;
			
			for ( var i=0, iLen=aArray.length ; i<iLen ; i++ )
			{
				oSettings.asDataSearch[i] = _fnBuildSearchRow( oSettings,
					_fnGetRowData( oSettings, aArray[i], 'filter' ) );
			}
		}
		
		/*
		 * Function: _fnBuildSearchRow
		 * Purpose:  Create a searchable string from a single data row
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           array:aData - Row data array to use for the data to search
		 */
		function _fnBuildSearchRow( oSettings, aData )
		{
			var sSearch = '';
			if ( typeof oSettings.__nTmpFilter == 'undefined' ) {
				oSettings.__nTmpFilter = document.createElement('div');
			}
			var nTmp = oSettings.__nTmpFilter;
			
			for ( var j=0, jLen=oSettings.aoColumns.length ; j<jLen ; j++ )
			{
				if ( oSettings.aoColumns[j].bSearchable )
				{
					var sData = aData[j];
					sSearch += _fnDataToSearch( sData, oSettings.aoColumns[j].sType )+'  ';
				}
			}
			
			/* If it looks like there is an HTML entity in the string, attempt to decode it */
			if ( sSearch.indexOf('&') !== -1 )
			{
				nTmp.innerHTML = sSearch;
				sSearch = nTmp.textContent ? nTmp.textContent : nTmp.innerText;
				
				/* IE and Opera appear to put an newline where there is a <br> tag - remove it */
				sSearch = sSearch.replace(/\n/g," ").replace(/\r/g,"");
			}
			
			return sSearch;
		}
		
		/*
		 * Function: _fnFilterCreateSearch
		 * Purpose:  Build a regular expression object suitable for searching a table
		 * Returns:  RegExp: - constructed object
		 * Inputs:   string:sSearch - string to search for
		 *           bool:bRegex - treat as a regular expression or not
		 *           bool:bSmart - perform smart filtering or not
		 */
		function _fnFilterCreateSearch( sSearch, bRegex, bSmart )
		{
			var asSearch, sRegExpString;
			
			if ( bSmart )
			{
				/* Generate the regular expression to use. Something along the lines of:
				 * ^(?=.*?\bone\b)(?=.*?\btwo\b)(?=.*?\bthree\b).*$
				 */
				asSearch = bRegex ? sSearch.split( ' ' ) : _fnEscapeRegex( sSearch ).split( ' ' );
				sRegExpString = '^(?=.*?'+asSearch.join( ')(?=.*?' )+').*$';
				return new RegExp( sRegExpString, "i" );
			}
			else
			{
				sSearch = bRegex ? sSearch : _fnEscapeRegex( sSearch );
				return new RegExp( sSearch, "i" );
			}
		}
		
		/*
		 * Function: _fnDataToSearch
		 * Purpose:  Convert raw data into something that the user can search on
		 * Returns:  string: - search string
		 * Inputs:   string:sData - data to be modified
		 *           string:sType - data type
		 */
		function _fnDataToSearch ( sData, sType )
		{
			if ( typeof _oExt.ofnSearch[sType] == "function" )
			{
				return _oExt.ofnSearch[sType]( sData );
			}
			else if ( sType == "html" )
			{
				return sData.replace(/\n/g," ").replace( /<.*?>/g, "" );
			}
			else if ( typeof sData == "string" )
			{
				return sData.replace(/\n/g," ");
			}
			else if ( sData === null )
			{
				return '';
			}
			return sData;
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: Sorting
		 */
		
		/*
	 	 * Function: _fnSort
		 * Purpose:  Change the order of the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           bool:bApplyClasses - optional - should we apply classes or not
		 * Notes:    We always sort the master array and then apply a filter again
		 *   if it is needed. This probably isn't optimal - but atm I can't think
		 *   of any other way which is (each has disadvantages). we want to sort aiDisplayMaster - 
		 *   but according to aoData[]._aData
		 */
		function _fnSort ( oSettings, bApplyClasses )
		{
			var
				iDataSort, iDataType,
				i, iLen, j, jLen,
				aaSort = [],
			 	aiOrig = [],
				oSort = _oExt.oSort,
				aoData = oSettings.aoData,
				aoColumns = oSettings.aoColumns;
			
			/* No sorting required if server-side or no sorting array */
			if ( !oSettings.oFeatures.bServerSide && 
				(oSettings.aaSorting.length !== 0 || oSettings.aaSortingFixed !== null) )
			{
				if ( oSettings.aaSortingFixed !== null )
				{
					aaSort = oSettings.aaSortingFixed.concat( oSettings.aaSorting );
				}
				else
				{
					aaSort = oSettings.aaSorting.slice();
				}
				
				/* If there is a sorting data type, and a fuction belonging to it, then we need to
				 * get the data from the developer's function and apply it for this column
				 */
				for ( i=0 ; i<aaSort.length ; i++ )
				{
					var iColumn = aaSort[i][0];
					var iVisColumn = _fnColumnIndexToVisible( oSettings, iColumn );
					var sDataType = oSettings.aoColumns[ iColumn ].sSortDataType;
					if ( typeof _oExt.afnSortData[sDataType] != 'undefined' )
					{
						var aData = _oExt.afnSortData[sDataType]( oSettings, iColumn, iVisColumn );
						for ( j=0, jLen=aoData.length ; j<jLen ; j++ )
						{
							_fnSetCellData( oSettings, j, iColumn, aData[j] );
						}
					}
				}
				
				/* Create a value - key array of the current row positions such that we can use their
				 * current position during the sort, if values match, in order to perform stable sorting
				 */
				for ( i=0, iLen=oSettings.aiDisplayMaster.length ; i<iLen ; i++ )
				{
					aiOrig[ oSettings.aiDisplayMaster[i] ] = i;
				}
				
				/* Do the sort - here we want multi-column sorting based on a given data source (column)
				 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
				 * follow on it's own, but this is what we want (example two column sorting):
				 *  fnLocalSorting = function(a,b){
				 *  	var iTest;
				 *  	iTest = oSort['string-asc']('data11', 'data12');
				 *  	if (iTest !== 0)
				 *  		return iTest;
				 *    iTest = oSort['numeric-desc']('data21', 'data22');
				 *    if (iTest !== 0)
				 *  		return iTest;
				 *  	return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
				 *  }
				 * Basically we have a test for each sorting column, if the data in that column is equal,
				 * test the next column. If all columns match, then we use a numeric sort on the row 
				 * positions in the original data array to provide a stable sort.
				 */
				var iSortLen = aaSort.length;
				oSettings.aiDisplayMaster.sort( function ( a, b ) {
					var iTest, iDataSort, sDataType;
					for ( i=0 ; i<iSortLen ; i++ )
					{
						iDataSort = aoColumns[ aaSort[i][0] ].iDataSort;
						sDataType = aoColumns[ iDataSort ].sType;
						iTest = oSort[ (sDataType?sDataType:'string')+"-"+aaSort[i][1] ](
							_fnGetCellData( oSettings, a, iDataSort, 'sort' ),
							_fnGetCellData( oSettings, b, iDataSort, 'sort' )
						);
						
						if ( iTest !== 0 )
						{
							return iTest;
						}
					}
					
					return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
				} );
			}
			
			/* Alter the sorting classes to take account of the changes */
			if ( (typeof bApplyClasses == 'undefined' || bApplyClasses) && !oSettings.oFeatures.bDeferRender )
			{
				_fnSortingClasses( oSettings );
			}
			
			/* Tell the draw function that we have sorted the data */
			oSettings.bSorted = true;
			
			/* Copy the master data into the draw array and re-draw */
			if ( oSettings.oFeatures.bFilter )
			{
				/* _fnFilter() will redraw the table for us */
				_fnFilterComplete( oSettings, oSettings.oPreviousSearch, 1 );
			}
			else
			{
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
				oSettings._iDisplayStart = 0; /* reset display back to page 0 */
				_fnCalculateEnd( oSettings );
				_fnDraw( oSettings );
			}
		}
		
		/*
		 * Function: _fnSortAttachListener
		 * Purpose:  Attach a sort handler (click) to a node
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:nNode - node to attach the handler to
		 *           int:iDataIndex - column sorting index
		 *           function:fnCallback - callback function - optional
		 */
		function _fnSortAttachListener ( oSettings, nNode, iDataIndex, fnCallback )
		{
			$(nNode).bind( 'click.DT', function (e) {
				/* If the column is not sortable - don't to anything */
				if ( oSettings.aoColumns[iDataIndex].bSortable === false )
				{
					return;
				}
				
				/*
				 * This is a little bit odd I admit... I declare a temporary function inside the scope of
				 * _fnBuildHead and the click handler in order that the code presented here can be used 
				 * twice - once for when bProcessing is enabled, and another time for when it is 
				 * disabled, as we need to perform slightly different actions.
				 *   Basically the issue here is that the Javascript engine in modern browsers don't 
				 * appear to allow the rendering engine to update the display while it is still excuting
				 * it's thread (well - it does but only after long intervals). This means that the 
				 * 'processing' display doesn't appear for a table sort. To break the js thread up a bit
				 * I force an execution break by using setTimeout - but this breaks the expected 
				 * thread continuation for the end-developer's point of view (their code would execute
				 * too early), so we on;y do it when we absolutely have to.
				 */
				var fnInnerSorting = function () {
					var iColumn, iNextSort;
					
					/* If the shift key is pressed then we are multipe column sorting */
					if ( e.shiftKey )
					{
						/* Are we already doing some kind of sort on this column? */
						var bFound = false;
						for ( var i=0 ; i<oSettings.aaSorting.length ; i++ )
						{
							if ( oSettings.aaSorting[i][0] == iDataIndex )
							{
								bFound = true;
								iColumn = oSettings.aaSorting[i][0];
								iNextSort = oSettings.aaSorting[i][2]+1;
								
								if ( typeof oSettings.aoColumns[iColumn].asSorting[iNextSort] == 'undefined' )
								{
									/* Reached the end of the sorting options, remove from multi-col sort */
									oSettings.aaSorting.splice( i, 1 );
								}
								else
								{
									/* Move onto next sorting direction */
									oSettings.aaSorting[i][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort];
									oSettings.aaSorting[i][2] = iNextSort;
								}
								break;
							}
						}
						
						/* No sort yet - add it in */
						if ( bFound === false )
						{
							oSettings.aaSorting.push( [ iDataIndex, 
								oSettings.aoColumns[iDataIndex].asSorting[0], 0 ] );
						}
					}
					else
					{
						/* If no shift key then single column sort */
						if ( oSettings.aaSorting.length == 1 && oSettings.aaSorting[0][0] == iDataIndex )
						{
							iColumn = oSettings.aaSorting[0][0];
							iNextSort = oSettings.aaSorting[0][2]+1;
							if ( typeof oSettings.aoColumns[iColumn].asSorting[iNextSort] == 'undefined' )
							{
								iNextSort = 0;
							}
							oSettings.aaSorting[0][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort];
							oSettings.aaSorting[0][2] = iNextSort;
						}
						else
						{
							oSettings.aaSorting.splice( 0, oSettings.aaSorting.length );
							oSettings.aaSorting.push( [ iDataIndex, 
								oSettings.aoColumns[iDataIndex].asSorting[0], 0 ] );
						}
					}
					
					/* Run the sort */
					_fnSort( oSettings );
				}; /* /fnInnerSorting */
				
				if ( !oSettings.oFeatures.bProcessing )
				{
					fnInnerSorting();
				}
				else
				{
					_fnProcessingDisplay( oSettings, true );
					setTimeout( function() {
						fnInnerSorting();
						if ( !oSettings.oFeatures.bServerSide )
						{
							_fnProcessingDisplay( oSettings, false );
						}
					}, 0 );
				}
				
				/* Call the user specified callback function - used for async user interaction */
				if ( typeof fnCallback == 'function' )
				{
					fnCallback( oSettings );
				}
			} );
		}
		
		/*
		 * Function: _fnSortingClasses
		 * Purpose:  Set the sortting classes on the header
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 * Notes:    It is safe to call this function when bSort and bSortClasses are false
		 */
		function _fnSortingClasses( oSettings )
		{
			var i, iLen, j, jLen, iFound;
			var aaSort, sClass;
			var iColumns = oSettings.aoColumns.length;
			var oClasses = oSettings.oClasses;
			
			for ( i=0 ; i<iColumns ; i++ )
			{
				if ( oSettings.aoColumns[i].bSortable )
				{
					$(oSettings.aoColumns[i].nTh).removeClass( oClasses.sSortAsc +" "+ oClasses.sSortDesc +
						" "+ oSettings.aoColumns[i].sSortingClass );
				}
			}
			
			if ( oSettings.aaSortingFixed !== null )
			{
				aaSort = oSettings.aaSortingFixed.concat( oSettings.aaSorting );
			}
			else
			{
				aaSort = oSettings.aaSorting.slice();
			}
			
			/* Apply the required classes to the header */
			for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
			{
				if ( oSettings.aoColumns[i].bSortable )
				{
					sClass = oSettings.aoColumns[i].sSortingClass;
					iFound = -1;
					for ( j=0 ; j<aaSort.length ; j++ )
					{
						if ( aaSort[j][0] == i )
						{
							sClass = ( aaSort[j][1] == "asc" ) ?
								oClasses.sSortAsc : oClasses.sSortDesc;
							iFound = j;
							break;
						}
					}
					$(oSettings.aoColumns[i].nTh).addClass( sClass );
					
					if ( oSettings.bJUI )
					{
						/* jQuery UI uses extra markup */
						var jqSpan = $("span", oSettings.aoColumns[i].nTh);
						jqSpan.removeClass(oClasses.sSortJUIAsc +" "+ oClasses.sSortJUIDesc +" "+ 
							oClasses.sSortJUI +" "+ oClasses.sSortJUIAscAllowed +" "+ oClasses.sSortJUIDescAllowed );
						
						var sSpanClass;
						if ( iFound == -1 )
						{
						 	sSpanClass = oSettings.aoColumns[i].sSortingClassJUI;
						}
						else if ( aaSort[iFound][1] == "asc" )
						{
							sSpanClass = oClasses.sSortJUIAsc;
						}
						else
						{
							sSpanClass = oClasses.sSortJUIDesc;
						}
						
						jqSpan.addClass( sSpanClass );
					}
				}
				else
				{
					/* No sorting on this column, so add the base class. This will have been assigned by
					 * _fnAddColumn
					 */
					$(oSettings.aoColumns[i].nTh).addClass( oSettings.aoColumns[i].sSortingClass );
				}
			}
			
			/* 
			 * Apply the required classes to the table body
			 * Note that this is given as a feature switch since it can significantly slow down a sort
			 * on large data sets (adding and removing of classes is always slow at the best of times..)
			 * Further to this, note that this code is admitadly fairly ugly. It could be made a lot 
			 * simpiler using jQuery selectors and add/removeClass, but that is significantly slower
			 * (on the order of 5 times slower) - hence the direct DOM manipulation here.
			 * Note that for defered drawing we do use jQuery - the reason being that taking the first
			 * row found to see if the whole column needs processed can miss classes since the first
			 * column might be new.
			 */
			sClass = oClasses.sSortColumn;
			
			if ( oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses )
			{
				var nTds = _fnGetTdNodes( oSettings );

				/* Remove the old classes */
				if ( oSettings.oFeatures.bDeferRender )
				{
					$(nTds).removeClass(sClass+'1 '+sClass+'2 '+sClass+'3');
				}
				else if ( nTds.length >= iColumns )
				{
					for ( i=0 ; i<iColumns ; i++ )
					{
						if ( nTds[i].className.indexOf(sClass+"1") != -1 )
						{
							for ( j=0, jLen=(nTds.length/iColumns) ; j<jLen ; j++ )
							{
								nTds[(iColumns*j)+i].className = 
									$.trim( nTds[(iColumns*j)+i].className.replace( sClass+"1", "" ) );
							}
						}
						else if ( nTds[i].className.indexOf(sClass+"2") != -1 )
						{
							for ( j=0, jLen=(nTds.length/iColumns) ; j<jLen ; j++ )
							{
								nTds[(iColumns*j)+i].className = 
									$.trim( nTds[(iColumns*j)+i].className.replace( sClass+"2", "" ) );
							}
						}
						else if ( nTds[i].className.indexOf(sClass+"3") != -1 )
						{
							for ( j=0, jLen=(nTds.length/iColumns) ; j<jLen ; j++ )
							{
								nTds[(iColumns*j)+i].className = 
									$.trim( nTds[(iColumns*j)+i].className.replace( " "+sClass+"3", "" ) );
							}
						}
					}
				}
				
				/* Add the new classes to the table */
				var iClass = 1, iTargetCol;
				for ( i=0 ; i<aaSort.length ; i++ )
				{
					iTargetCol = parseInt( aaSort[i][0], 10 );
					for ( j=0, jLen=(nTds.length/iColumns) ; j<jLen ; j++ )
					{
						nTds[(iColumns*j)+iTargetCol].className += " "+sClass+iClass;
					}
					
					if ( iClass < 3 )
					{
						iClass++;
					}
				}
			}
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: Pagination. Note that most of the paging logic is done in 
		 * _oExt.oPagination
		 */
		
		/*
		 * Function: _fnFeatureHtmlPaginate
		 * Purpose:  Generate the node required for default pagination
		 * Returns:  node
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFeatureHtmlPaginate ( oSettings )
		{
			if ( oSettings.oScroll.bInfinite )
			{
				return null;
			}
			
			var nPaginate = document.createElement( 'div' );
			nPaginate.className = oSettings.oClasses.sPaging+oSettings.sPaginationType;
			
			_oExt.oPagination[ oSettings.sPaginationType ].fnInit( oSettings, nPaginate, 
				function( oSettings ) {
					_fnCalculateEnd( oSettings );
					_fnDraw( oSettings );
				}
			);
			
			/* Add a draw callback for the pagination on first instance, to update the paging display */
			if ( typeof oSettings.aanFeatures.p == "undefined" )
			{
				oSettings.aoDrawCallback.push( {
					"fn": function( oSettings ) {
						_oExt.oPagination[ oSettings.sPaginationType ].fnUpdate( oSettings, function( oSettings ) {
							_fnCalculateEnd( oSettings );
							_fnDraw( oSettings );
						} );
					},
					"sName": "pagination"
				} );
			}
			return nPaginate;
		}
		
		/*
		 * Function: _fnPageChange
		 * Purpose:  Alter the display settings to change the page
		 * Returns:  bool:true - page has changed, false - no change (no effect) eg 'first' on page 1
		 * Inputs:   object:oSettings - dataTables settings object
		 *           string:sAction - paging action to take: "first", "previous", "next" or "last"
		 */
		function _fnPageChange ( oSettings, sAction )
		{
			var iOldStart = oSettings._iDisplayStart;
			
			if ( sAction == "first" )
			{
				oSettings._iDisplayStart = 0;
			}
			else if ( sAction == "previous" )
			{
				oSettings._iDisplayStart = oSettings._iDisplayLength>=0 ?
					oSettings._iDisplayStart - oSettings._iDisplayLength :
					0;
				
				/* Correct for underrun */
				if ( oSettings._iDisplayStart < 0 )
				{
				  oSettings._iDisplayStart = 0;
				}
			}
			else if ( sAction == "next" )
			{
				if ( oSettings._iDisplayLength >= 0 )
				{
					/* Make sure we are not over running the display array */
					if ( oSettings._iDisplayStart + oSettings._iDisplayLength < oSettings.fnRecordsDisplay() )
					{
						oSettings._iDisplayStart += oSettings._iDisplayLength;
					}
				}
				else
				{
					oSettings._iDisplayStart = 0;
				}
			}
			else if ( sAction == "last" )
			{
				if ( oSettings._iDisplayLength >= 0 )
				{
					var iPages = parseInt( (oSettings.fnRecordsDisplay()-1) / oSettings._iDisplayLength, 10 ) + 1;
					oSettings._iDisplayStart = (iPages-1) * oSettings._iDisplayLength;
				}
				else
				{
					oSettings._iDisplayStart = 0;
				}
			}
			else
			{
				_fnLog( oSettings, 0, "Unknown paging action: "+sAction );
			}
			
			return iOldStart != oSettings._iDisplayStart;
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: HTML info
		 */
		
		/*
		 * Function: _fnFeatureHtmlInfo
		 * Purpose:  Generate the node required for the info display
		 * Returns:  node
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFeatureHtmlInfo ( oSettings )
		{
			var nInfo = document.createElement( 'div' );
			nInfo.className = oSettings.oClasses.sInfo;
			
			/* Actions that are to be taken once only for this feature */
			if ( typeof oSettings.aanFeatures.i == "undefined" )
			{
				/* Add draw callback */
				oSettings.aoDrawCallback.push( {
					"fn": _fnUpdateInfo,
					"sName": "information"
				} );
				
				/* Add id */
				if ( oSettings.sTableId !== '' )
				{
					nInfo.setAttribute( 'id', oSettings.sTableId+'_info' );
				}
			}
			
			return nInfo;
		}
		
		/*
		 * Function: _fnUpdateInfo
		 * Purpose:  Update the information elements in the display
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnUpdateInfo ( oSettings )
		{
			/* Show information about the table */
			if ( !oSettings.oFeatures.bInfo || oSettings.aanFeatures.i.length === 0 )
			{
				return;
			}
			
			var
				iStart = oSettings._iDisplayStart+1, iEnd = oSettings.fnDisplayEnd(),
				iMax = oSettings.fnRecordsTotal(), iTotal = oSettings.fnRecordsDisplay(),
				sStart = oSettings.fnFormatNumber( iStart ), sEnd = oSettings.fnFormatNumber( iEnd ),
				sMax = oSettings.fnFormatNumber( iMax ), sTotal = oSettings.fnFormatNumber( iTotal ),
				sOut;
			
			/* When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
			 * internally
			 */
			if ( oSettings.oScroll.bInfinite )
			{
				sStart = oSettings.fnFormatNumber( 1 );
			}
			
			if ( oSettings.fnRecordsDisplay() === 0 && 
				   oSettings.fnRecordsDisplay() == oSettings.fnRecordsTotal() )
			{
				/* Empty record set */
				sOut = oSettings.oLanguage.sInfoEmpty+ oSettings.oLanguage.sInfoPostFix;
			}
			else if ( oSettings.fnRecordsDisplay() === 0 )
			{
				/* Rmpty record set after filtering */
				sOut = oSettings.oLanguage.sInfoEmpty +' '+ 
					oSettings.oLanguage.sInfoFiltered.replace('_MAX_', sMax)+
						oSettings.oLanguage.sInfoPostFix;
			}
			else if ( oSettings.fnRecordsDisplay() == oSettings.fnRecordsTotal() )
			{
				/* Normal record set */
				sOut = oSettings.oLanguage.sInfo.
						replace('_START_', sStart).
						replace('_END_',   sEnd).
						replace('_TOTAL_', sTotal)+ 
					oSettings.oLanguage.sInfoPostFix;
			}
			else
			{
				/* Record set after filtering */
				sOut = oSettings.oLanguage.sInfo.
						replace('_START_', sStart).
						replace('_END_',   sEnd).
						replace('_TOTAL_', sTotal) +' '+ 
					oSettings.oLanguage.sInfoFiltered.replace('_MAX_', 
						oSettings.fnFormatNumber(oSettings.fnRecordsTotal()))+ 
					oSettings.oLanguage.sInfoPostFix;
			}
			
			if ( oSettings.oLanguage.fnInfoCallback !== null )
			{
				sOut = oSettings.oLanguage.fnInfoCallback( oSettings, iStart, iEnd, iMax, iTotal, sOut );
			}
			
			var n = oSettings.aanFeatures.i;
			for ( var i=0, iLen=n.length ; i<iLen ; i++ )
			{
				$(n[i]).html( sOut );
			}
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: Length change
		 */
		
		/*
		 * Function: _fnFeatureHtmlLength
		 * Purpose:  Generate the node required for user display length changing
		 * Returns:  node
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFeatureHtmlLength ( oSettings )
		{
			if ( oSettings.oScroll.bInfinite )
			{
				return null;
			}
			
			/* This can be overruled by not using the _MENU_ var/macro in the language variable */
			var sName = (oSettings.sTableId === "") ? "" : 'name="'+oSettings.sTableId+'_length"';
			var sStdMenu = '<select size="1" '+sName+'>';
			var i, iLen;
			
			if ( oSettings.aLengthMenu.length == 2 && typeof oSettings.aLengthMenu[0] == 'object' && 
					typeof oSettings.aLengthMenu[1] == 'object' )
			{
				for ( i=0, iLen=oSettings.aLengthMenu[0].length ; i<iLen ; i++ )
				{
					sStdMenu += '<option value="'+oSettings.aLengthMenu[0][i]+'">'+
						oSettings.aLengthMenu[1][i]+'</option>';
				}
			}
			else
			{
				for ( i=0, iLen=oSettings.aLengthMenu.length ; i<iLen ; i++ )
				{
					sStdMenu += '<option value="'+oSettings.aLengthMenu[i]+'">'+
						oSettings.aLengthMenu[i]+'</option>';
				}
			}
			sStdMenu += '</select>';
			
			var nLength = document.createElement( 'div' );
			if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.l == "undefined" )
			{
				nLength.setAttribute( 'id', oSettings.sTableId+'_length' );
			}
			nLength.className = oSettings.oClasses.sLength;
			nLength.innerHTML = '<label>'+oSettings.oLanguage.sLengthMenu.replace( '_MENU_', sStdMenu )+'</label>';
			
			/*
			 * Set the length to the current display length - thanks to Andrea Pavlovic for this fix,
			 * and Stefan Skopnik for fixing the fix!
			 */
			$('select option[value="'+oSettings._iDisplayLength+'"]',nLength).attr("selected",true);
			
			$('select', nLength).bind( 'change.DT', function(e) {
				var iVal = $(this).val();
				
				/* Update all other length options for the new display */
				var n = oSettings.aanFeatures.l;
				for ( i=0, iLen=n.length ; i<iLen ; i++ )
				{
					if ( n[i] != this.parentNode )
					{
						$('select', n[i]).val( iVal );
					}
				}
				
				/* Redraw the table */
				oSettings._iDisplayLength = parseInt(iVal, 10);
				_fnCalculateEnd( oSettings );
				
				/* If we have space to show extra rows (backing up from the end point - then do so */
				if ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() )
				{
					oSettings._iDisplayStart = oSettings.fnDisplayEnd() - oSettings._iDisplayLength;
					if ( oSettings._iDisplayStart < 0 )
					{
						oSettings._iDisplayStart = 0;
					}
				}
				
				if ( oSettings._iDisplayLength == -1 )
				{
					oSettings._iDisplayStart = 0;
				}
				
				_fnDraw( oSettings );
			} );
			
			return nLength;
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Feature: Processing incidator
		 */
		
		/*
		 * Function: _fnFeatureHtmlProcessing
		 * Purpose:  Generate the node required for the processing node
		 * Returns:  node
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnFeatureHtmlProcessing ( oSettings )
		{
			var nProcessing = document.createElement( 'div' );
			
			if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.r == "undefined" )
			{
				nProcessing.setAttribute( 'id', oSettings.sTableId+'_processing' );
			}
			nProcessing.innerHTML = oSettings.oLanguage.sProcessing;
			nProcessing.className = oSettings.oClasses.sProcessing;
			oSettings.nTable.parentNode.insertBefore( nProcessing, oSettings.nTable );
			
			return nProcessing;
		}
		
		/*
		 * Function: _fnProcessingDisplay
		 * Purpose:  Display or hide the processing indicator
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           bool:
		 *   true - show the processing indicator
		 *   false - don't show
		 */
		function _fnProcessingDisplay ( oSettings, bShow )
		{
			if ( oSettings.oFeatures.bProcessing )
			{
				var an = oSettings.aanFeatures.r;
				for ( var i=0, iLen=an.length ; i<iLen ; i++ )
				{
					an[i].style.visibility = bShow ? "visible" : "hidden";
				}
			}
		}
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Support functions
		 */
		
		/*
		 * Function: _fnVisibleToColumnIndex
		 * Purpose:  Covert the index of a visible column to the index in the data array (take account
		 *   of hidden columns)
		 * Returns:  int:i - the data index
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnVisibleToColumnIndex( oSettings, iMatch )
		{
			var iColumn = -1;
			
			for ( var i=0 ; i<oSettings.aoColumns.length ; i++ )
			{
				if ( oSettings.aoColumns[i].bVisible === true )
				{
					iColumn++;
				}
				
				if ( iColumn == iMatch )
				{
					return i;
				}
			}
			
			return null;
		}
		
		/*
		 * Function: _fnColumnIndexToVisible
		 * Purpose:  Covert the index of an index in the data array and convert it to the visible
		 *   column index (take account of hidden columns)
		 * Returns:  int:i - the data index
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnColumnIndexToVisible( oSettings, iMatch )
		{
			var iVisible = -1;
			for ( var i=0 ; i<oSettings.aoColumns.length ; i++ )
			{
				if ( oSettings.aoColumns[i].bVisible === true )
				{
					iVisible++;
				}
				
				if ( i == iMatch )
				{
					return oSettings.aoColumns[i].bVisible === true ? iVisible : null;
				}
			}
			
			return null;
		}
		
		
		/*
		 * Function: _fnNodeToDataIndex
		 * Purpose:  Take a TR element and convert it to an index in aoData
		 * Returns:  int:i - index if found, null if not
		 * Inputs:   object:s - dataTables settings object
		 *           node:n - the TR element to find
		 */
		function _fnNodeToDataIndex( s, n )
		{
			var i, iLen;
			
			/* Optimisation - see if the nodes which are currently visible match, since that is
			 * the most likely node to be asked for (a selector or event for example)
			 */
			for ( i=s._iDisplayStart, iLen=s._iDisplayEnd ; i<iLen ; i++ )
			{
				if ( s.aoData[ s.aiDisplay[i] ].nTr == n )
				{
					return s.aiDisplay[i];
				}
			}
			
			/* Otherwise we are in for a slog through the whole data cache */
			for ( i=0, iLen=s.aoData.length ; i<iLen ; i++ )
			{
				if ( s.aoData[i].nTr == n )
				{
					return i;
				}
			}
			return null;
		}
		
		/*
		 * Function: _fnVisbleColumns
		 * Purpose:  Get the number of visible columns
		 * Returns:  int:i - the number of visible columns
		 * Inputs:   object:oS - dataTables settings object
		 */
		function _fnVisbleColumns( oS )
		{
			var iVis = 0;
			for ( var i=0 ; i<oS.aoColumns.length ; i++ )
			{
				if ( oS.aoColumns[i].bVisible === true )
				{
					iVis++;
				}
			}
			return iVis;
		}
		
		/*
		 * Function: _fnCalculateEnd
		 * Purpose:  Rcalculate the end point based on the start point
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnCalculateEnd( oSettings )
		{
			if ( oSettings.oFeatures.bPaginate === false )
			{
				oSettings._iDisplayEnd = oSettings.aiDisplay.length;
			}
			else
			{
				/* Set the end point of the display - based on how many elements there are
				 * still to display
				 */
				if ( oSettings._iDisplayStart + oSettings._iDisplayLength > oSettings.aiDisplay.length ||
					   oSettings._iDisplayLength == -1 )
				{
					oSettings._iDisplayEnd = oSettings.aiDisplay.length;
				}
				else
				{
					oSettings._iDisplayEnd = oSettings._iDisplayStart + oSettings._iDisplayLength;
				}
			}
		}
		
		/*
		 * Function: _fnConvertToWidth
		 * Purpose:  Convert a CSS unit width to pixels (e.g. 2em)
		 * Returns:  int:iWidth - width in pixels
		 * Inputs:   string:sWidth - width to be converted
		 *           node:nParent - parent to get the with for (required for
		 *             relative widths) - optional
		 */
		function _fnConvertToWidth ( sWidth, nParent )
		{
			if ( !sWidth || sWidth === null || sWidth === '' )
			{
				return 0;
			}
			
			if ( typeof nParent == "undefined" )
			{
				nParent = document.getElementsByTagName('body')[0];
			}
			
			var iWidth;
			var nTmp = document.createElement( "div" );
			nTmp.style.width = _fnStringToCss( sWidth );
			
			nParent.appendChild( nTmp );
			iWidth = nTmp.offsetWidth;
			nParent.removeChild( nTmp );
			
			return ( iWidth );
		}
		
		/*
		 * Function: _fnCalculateColumnWidths
		 * Purpose:  Calculate the width of columns for the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnCalculateColumnWidths ( oSettings )
		{
			var iTableWidth = oSettings.nTable.offsetWidth;
			var iUserInputs = 0;
			var iTmpWidth;
			var iVisibleColumns = 0;
			var iColums = oSettings.aoColumns.length;
			var i, iIndex, iCorrector, iWidth;
			var oHeaders = $('th', oSettings.nTHead);
			
			/* Convert any user input sizes into pixel sizes */
			for ( i=0 ; i<iColums ; i++ )
			{
				if ( oSettings.aoColumns[i].bVisible )
				{
					iVisibleColumns++;
					
					if ( oSettings.aoColumns[i].sWidth !== null )
					{
						iTmpWidth = _fnConvertToWidth( oSettings.aoColumns[i].sWidthOrig, 
							oSettings.nTable.parentNode );
						if ( iTmpWidth !== null )
						{
							oSettings.aoColumns[i].sWidth = _fnStringToCss( iTmpWidth );
						}
							
						iUserInputs++;
					}
				}
			}
			
			/* If the number of columns in the DOM equals the number that we have to process in 
			 * DataTables, then we can use the offsets that are created by the web-browser. No custom 
			 * sizes can be set in order for this to happen, nor scrolling used
			 */
			if ( iColums == oHeaders.length && iUserInputs === 0 && iVisibleColumns == iColums &&
				oSettings.oScroll.sX === "" && oSettings.oScroll.sY === "" )
			{
				for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
				{
					iTmpWidth = $(oHeaders[i]).width();
					if ( iTmpWidth !== null )
					{
						oSettings.aoColumns[i].sWidth = _fnStringToCss( iTmpWidth );
					}
				}
			}
			else
			{
				/* Otherwise we are going to have to do some calculations to get the width of each column.
				 * Construct a 1 row table with the widest node in the data, and any user defined widths,
				 * then insert it into the DOM and allow the browser to do all the hard work of
				 * calculating table widths.
				 */
				var
					nCalcTmp = oSettings.nTable.cloneNode( false ),
					nTheadClone = oSettings.nTHead.cloneNode(true),
					nBody = document.createElement( 'tbody' ),
					nTr = document.createElement( 'tr' ),
					nDivSizing;
				
				nCalcTmp.removeAttribute( "id" );
				nCalcTmp.appendChild( nTheadClone );
				if ( oSettings.nTFoot !== null )
				{
					nCalcTmp.appendChild( oSettings.nTFoot.cloneNode(true) );
					_fnApplyToChildren( function(n) {
						n.style.width = "";
					}, nCalcTmp.getElementsByTagName('tr') );
				}
				
				nCalcTmp.appendChild( nBody );
				nBody.appendChild( nTr );
				
				/* Remove any sizing that was previously applied by the styles */
				var jqColSizing = $('thead th', nCalcTmp);
				if ( jqColSizing.length === 0 )
				{
					jqColSizing = $('tbody tr:eq(0)>td', nCalcTmp);
				}

				/* Apply custom sizing to the cloned header */
				var nThs = _fnGetUniqueThs( oSettings, nTheadClone );
				iCorrector = 0;
				for ( i=0 ; i<iColums ; i++ )
				{
					var oColumn = oSettings.aoColumns[i];
					if ( oColumn.bVisible && oColumn.sWidthOrig !== null && oColumn.sWidthOrig !== "" )
					{
						nThs[i-iCorrector].style.width = _fnStringToCss( oColumn.sWidthOrig );
					}
					else if ( oColumn.bVisible )
					{
						nThs[i-iCorrector].style.width = "";
					}
					else
					{
						iCorrector++;
					}
				}

				/* Find the biggest td for each column and put it into the table */
				for ( i=0 ; i<iColums ; i++ )
				{
					if ( oSettings.aoColumns[i].bVisible )
					{
						var nTd = _fnGetWidestNode( oSettings, i );
						if ( nTd !== null )
						{
							nTd = nTd.cloneNode(true);
							if ( oSettings.aoColumns[i].sContentPadding !== "" )
							{
								nTd.innerHTML += oSettings.aoColumns[i].sContentPadding;
							}
							nTr.appendChild( nTd );
						}
					}
				}
				
				/* Build the table and 'display' it */
				var nWrapper = oSettings.nTable.parentNode;
				nWrapper.appendChild( nCalcTmp );
				
				/* When scrolling (X or Y) we want to set the width of the table as appropriate. However,
				 * when not scrolling leave the table width as it is. This results in slightly different,
				 * but I think correct behaviour
				 */
				if ( oSettings.oScroll.sX !== "" && oSettings.oScroll.sXInner !== "" )
				{
					nCalcTmp.style.width = _fnStringToCss(oSettings.oScroll.sXInner);
				}
				else if ( oSettings.oScroll.sX !== "" )
				{
					nCalcTmp.style.width = "";
					if ( $(nCalcTmp).width() < nWrapper.offsetWidth )
					{
						nCalcTmp.style.width = _fnStringToCss( nWrapper.offsetWidth );
					}
				}
				else if ( oSettings.oScroll.sY !== "" )
				{
					nCalcTmp.style.width = _fnStringToCss( nWrapper.offsetWidth );
				}
				nCalcTmp.style.visibility = "hidden";
				
				/* Scrolling considerations */
				_fnScrollingWidthAdjust( oSettings, nCalcTmp );
				
				/* Read the width's calculated by the browser and store them for use by the caller. We
				 * first of all try to use the elements in the body, but it is possible that there are
				 * no elements there, under which circumstances we use the header elements
				 */
				var oNodes = $("tbody tr:eq(0)", nCalcTmp).children();
				if ( oNodes.length === 0 )
				{
					oNodes = _fnGetUniqueThs( oSettings, $('thead', nCalcTmp)[0] );
				}

				/* Browsers need a bit of a hand when a width is assigned to any columns when 
				 * x-scrolling as they tend to collapse the table to the min-width, even if
				 * we sent the column widths. So we need to keep track of what the table width
				 * should be by summing the user given values, and the automatic values
				 */
				if ( oSettings.oScroll.sX !== "" )
				{
					var iTotal = 0;
					iCorrector = 0;
					for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
					{
						if ( oSettings.aoColumns[i].bVisible )
						{
							if ( oSettings.aoColumns[i].sWidthOrig === null )
							{
								iTotal += $(oNodes[iCorrector]).outerWidth();
							}
							else
							{
								iTotal += parseInt(oSettings.aoColumns[i].sWidth.replace('px',''), 10) +
									($(oNodes[iCorrector]).outerWidth() - $(oNodes[iCorrector]).width());
							}
							iCorrector++;
						}
					}
				
					nCalcTmp.style.width = _fnStringToCss( iTotal );
					oSettings.nTable.style.width = _fnStringToCss( iTotal );
				}

				iCorrector = 0;
				for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
				{
					if ( oSettings.aoColumns[i].bVisible )
					{
						iWidth = $(oNodes[iCorrector]).width();
						if ( iWidth !== null && iWidth > 0 )
						{
							oSettings.aoColumns[i].sWidth = _fnStringToCss( iWidth );
						}
						iCorrector++;
					}
				}
				
				oSettings.nTable.style.width = _fnStringToCss( $(nCalcTmp).outerWidth() );
				nCalcTmp.parentNode.removeChild( nCalcTmp );
			}
		}
		
		/*
		 * Function: _fnScrollingWidthAdjust
		 * Purpose:  Adjust a table's width to take account of scrolling
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:n - table node
		 */
		function _fnScrollingWidthAdjust ( oSettings, n )
		{
			if ( oSettings.oScroll.sX === "" && oSettings.oScroll.sY !== "" )
			{
				/* When y-scrolling only, we want to remove the width of the scroll bar so the table
				 * + scroll bar will fit into the area avaialble.
				 */
				var iOrigWidth = $(n).width();
				n.style.width = _fnStringToCss( $(n).outerWidth()-oSettings.oScroll.iBarWidth );
			}
			else if ( oSettings.oScroll.sX !== "" )
			{
				/* When x-scrolling both ways, fix the table at it's current size, without adjusting */
				n.style.width = _fnStringToCss( $(n).outerWidth() );
			}
		}
		
		/*
		 * Function: _fnGetWidestNode
		 * Purpose:  Get the widest node
		 * Returns:  string: - max strlens for each column
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iCol - column of interest
		 */
		function _fnGetWidestNode( oSettings, iCol )
		{
			var iMaxIndex = _fnGetMaxLenString( oSettings, iCol );
			if ( iMaxIndex < 0 )
			{
				return null;
			}

			if ( oSettings.aoData[iMaxIndex].nTr === null )
			{
				var n = document.createElement('td');
				n.innerHTML = _fnGetCellData( oSettings, iMaxIndex, iCol, '' );
				return n;
			}
			return _fnGetTdNodes(oSettings, iMaxIndex)[iCol];
		}
		
		/*
		 * Function: _fnGetMaxLenString
		 * Purpose:  Get the maximum strlen for each data column
		 * Returns:  string: - max strlens for each column
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iCol - column of interest
		 */
		function _fnGetMaxLenString( oSettings, iCol )
		{
			var iMax = -1;
			var iMaxIndex = -1;
			
			for ( var i=0 ; i<oSettings.aoData.length ; i++ )
			{
				var s = _fnGetCellData( oSettings, i, iCol, 'display' )+"";
				s = s.replace( /<.*?>/g, "" );
				if ( s.length > iMax )
				{
					iMax = s.length;
					iMaxIndex = i;
				}
			}
			
			return iMaxIndex;
		}
		
		/*
		 * Function: _fnStringToCss
		 * Purpose:  Append a CSS unit (only if required) to a string
		 * Returns:  0 if match, 1 if length is different, 2 if no match
		 * Inputs:   array:aArray1 - first array
		 *           array:aArray2 - second array
		 */
		function _fnStringToCss( s )
		{
			if ( s === null )
			{
				return "0px";
			}
			
			if ( typeof s == 'number' )
			{
				if ( s < 0 )
				{
					return "0px";
				}
				return s+"px";
			}
			
			/* Check if the last character is not 0-9 */
			var c = s.charCodeAt( s.length-1 );
			if (c < 0x30 || c > 0x39)
			{
				return s;
			}
			return s+"px";
		}
		
		/*
		 * Function: _fnArrayCmp
		 * Purpose:  Compare two arrays
		 * Returns:  0 if match, 1 if length is different, 2 if no match
		 * Inputs:   array:aArray1 - first array
		 *           array:aArray2 - second array
		 */
		function _fnArrayCmp( aArray1, aArray2 )
		{
			if ( aArray1.length != aArray2.length )
			{
				return 1;
			}
			
			for ( var i=0 ; i<aArray1.length ; i++ )
			{
				if ( aArray1[i] != aArray2[i] )
				{
					return 2;
				}
			}
			
			return 0;
		}
		
		/*
		 * Function: _fnDetectType
		 * Purpose:  Get the sort type based on an input string
		 * Returns:  string: - type (defaults to 'string' if no type can be detected)
		 * Inputs:   string:sData - data we wish to know the type of
		 * Notes:    This function makes use of the DataTables plugin objct _oExt 
		 *   (.aTypes) such that new types can easily be added.
		 */
		function _fnDetectType( sData )
		{
			var aTypes = _oExt.aTypes;
			var iLen = aTypes.length;
			
			for ( var i=0 ; i<iLen ; i++ )
			{
				var sType = aTypes[i]( sData );
				if ( sType !== null )
				{
					return sType;
				}
			}
			
			return 'string';
		}
		
		/*
		 * Function: _fnSettingsFromNode
		 * Purpose:  Return the settings object for a particular table
		 * Returns:  object: Settings object - or null if not found
		 * Inputs:   node:nTable - table we are using as a dataTable
		 */
		function _fnSettingsFromNode ( nTable )
		{
			for ( var i=0 ; i<_aoSettings.length ; i++ )
			{
				if ( _aoSettings[i].nTable == nTable )
				{
					return _aoSettings[i];
				}
			}
			
			return null;
		}
		
		/*
		 * Function: _fnGetDataMaster
		 * Purpose:  Return an array with the full table data
		 * Returns:  array array:aData - Master data array
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnGetDataMaster ( oSettings )
		{
			var aData = [];
			var iLen = oSettings.aoData.length;
			for ( var i=0 ; i<iLen; i++ )
			{
				aData.push( oSettings.aoData[i]._aData );
			}
			return aData;
		}
		
		/*
		 * Function: _fnGetTrNodes
		 * Purpose:  Return an array with the TR nodes for the table
		 * Returns:  array: - TR array
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnGetTrNodes ( oSettings )
		{
			var aNodes = [];
			for ( var i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
			{
				if ( oSettings.aoData[i].nTr !== null )
				{
					aNodes.push( oSettings.aoData[i].nTr );
				}
			}
			return aNodes;
		}
		
		/*
		 * Function: _fnGetTdNodes
		 * Purpose:  Return an flat array with all TD nodes for the table, or row
		 * Returns:  array: - TD array
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iIndividualRow - aoData index to get the nodes for - optional if not
		 *             given then the return array will contain all nodes for the table
		 */
		function _fnGetTdNodes ( oSettings, iIndividualRow )
		{
			var anReturn = [];
			var iCorrector;
			var anTds;
			var iRow, iRows=oSettings.aoData.length,
				iColumn, iColumns, oData, sNodeName, iStart=0, iEnd=iRows;
			
			/* Allow the collection to be limited to just one row */
			if ( typeof iIndividualRow != 'undefined' )
			{
				iStart = iIndividualRow;
				iEnd = iIndividualRow+1;
			}

			for ( iRow=iStart ; iRow<iEnd ; iRow++ )
			{
				oData = oSettings.aoData[iRow];
				if ( oData.nTr !== null )
				{
					/* get the TD child nodes - taking into account text etc nodes */
					anTds = [];
					for ( iColumn=0, iColumns=oData.nTr.childNodes.length ; iColumn<iColumns ; iColumn++ )
					{
						sNodeName = oData.nTr.childNodes[iColumn].nodeName.toLowerCase();
						if ( sNodeName == 'td' || sNodeName == 'th' )
						{
							anTds.push( oData.nTr.childNodes[iColumn] );
						}
					}

					iCorrector = 0;
					for ( iColumn=0, iColumns=oSettings.aoColumns.length ; iColumn<iColumns ; iColumn++ )
					{
						if ( oSettings.aoColumns[iColumn].bVisible )
						{
							anReturn.push( anTds[iColumn-iCorrector] );
						}
						else
						{
							anReturn.push( oData._anHidden[iColumn] );
							iCorrector++;
						}
					}
				}
			}

			return anReturn;
		}
		
		/*
		 * Function: _fnEscapeRegex
		 * Purpose:  scape a string stuch that it can be used in a regular expression
		 * Returns:  string: - escaped string
		 * Inputs:   string:sVal - string to escape
		 */
		function _fnEscapeRegex ( sVal )
		{
			var acEscape = [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^' ];
		  var reReplace = new RegExp( '(\\' + acEscape.join('|\\') + ')', 'g' );
		  return sVal.replace(reReplace, '\\$1');
		}
		
		/*
		 * Function: _fnDeleteIndex
		 * Purpose:  Take an array of integers (index array) and remove a target integer (value - not 
		 *             the key!)
		 * Returns:  -
		 * Inputs:   a:array int - Index array to target
		 *           int:iTarget - value to find
		 */
		function _fnDeleteIndex( a, iTarget )
		{
			var iTargetIndex = -1;
			
			for ( var i=0, iLen=a.length ; i<iLen ; i++ )
			{
				if ( a[i] == iTarget )
				{
					iTargetIndex = i;
				}
				else if ( a[i] > iTarget )
				{
					a[i]--;
				}
			}
			
			if ( iTargetIndex != -1 )
			{
				a.splice( iTargetIndex, 1 );
			}
		}
		
		/*
		 * Function: _fnReOrderIndex
		 * Purpose:  Figure out how to reorder a display list
		 * Returns:  array int:aiReturn - index list for reordering
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnReOrderIndex ( oSettings, sColumns )
		{
			var aColumns = sColumns.split(',');
			var aiReturn = [];
			
			for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				for ( var j=0 ; j<iLen ; j++ )
				{
					if ( oSettings.aoColumns[i].sName == aColumns[j] )
					{
						aiReturn.push( j );
						break;
					}
				}
			}
			
			return aiReturn;
		}
		
		/*
		 * Function: _fnColumnOrdering
		 * Purpose:  Get the column ordering that DataTables expects
		 * Returns:  string: - comma separated list of names
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnColumnOrdering ( oSettings )
		{
			var sNames = '';
			for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				sNames += oSettings.aoColumns[i].sName+',';
			}
			if ( sNames.length == iLen )
			{
				return "";
			}
			return sNames.slice(0, -1);
		}
		
		/*
		 * Function: _fnLog
		 * Purpose:  Log an error message
		 * Returns:  -
		 * Inputs:   int:iLevel - log error messages, or display them to the user
		 *           string:sMesg - error message
		 */
		function _fnLog( oSettings, iLevel, sMesg )
		{
			var sAlert = oSettings.sTableId === "" ?
			 	"DataTables warning: " +sMesg :
			 	"DataTables warning (table id = '"+oSettings.sTableId+"'): " +sMesg;
			
			if ( iLevel === 0 )
			{
				if ( _oExt.sErrMode == 'alert' )
				{
					alert( sAlert );
				}
				else
				{
					throw sAlert;
				}
				return;
			}
			else if ( typeof console != 'undefined' && typeof console.log != 'undefined' )
			{
				console.log( sAlert );
			}
		}
		
		/*
		 * Function: _fnClearTable
		 * Purpose:  Nuke the table
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnClearTable( oSettings )
		{
			oSettings.aoData.splice( 0, oSettings.aoData.length );
			oSettings.aiDisplayMaster.splice( 0, oSettings.aiDisplayMaster.length );
			oSettings.aiDisplay.splice( 0, oSettings.aiDisplay.length );
			_fnCalculateEnd( oSettings );
		}
		
		/*
		 * Function: _fnSaveState
		 * Purpose:  Save the state of a table in a cookie such that the page can be reloaded
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 */
		function _fnSaveState ( oSettings )
		{
			if ( !oSettings.oFeatures.bStateSave || typeof oSettings.bDestroying != 'undefined' )
			{
				return;
			}
			
			/* Store the interesting variables */
			var i, iLen, sTmp;
			var sValue = "{";
			sValue += '"iCreate":'+ new Date().getTime()+',';
			sValue += '"iStart":'+ (oSettings.oScroll.bInfinite ? 0 : oSettings._iDisplayStart)+',';
			sValue += '"iEnd":'+ (oSettings.oScroll.bInfinite ? oSettings._iDisplayLength : oSettings._iDisplayEnd)+',';
			sValue += '"iLength":'+ oSettings._iDisplayLength+',';
			sValue += '"sFilter":"'+ encodeURIComponent(oSettings.oPreviousSearch.sSearch)+'",';
			sValue += '"sFilterEsc":'+ !oSettings.oPreviousSearch.bRegex+',';
			
			sValue += '"aaSorting":[ ';
			for ( i=0 ; i<oSettings.aaSorting.length ; i++ )
			{
				sValue += '['+oSettings.aaSorting[i][0]+',"'+oSettings.aaSorting[i][1]+'"],';
			}
			sValue = sValue.substring(0, sValue.length-1);
			sValue += "],";
			
			sValue += '"aaSearchCols":[ ';
			for ( i=0 ; i<oSettings.aoPreSearchCols.length ; i++ )
			{
				sValue += '["'+encodeURIComponent(oSettings.aoPreSearchCols[i].sSearch)+
					'",'+!oSettings.aoPreSearchCols[i].bRegex+'],';
			}
			sValue = sValue.substring(0, sValue.length-1);
			sValue += "],";
			
			sValue += '"abVisCols":[ ';
			for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
			{
				sValue += oSettings.aoColumns[i].bVisible+",";
			}
			sValue = sValue.substring(0, sValue.length-1);
			sValue += "]";
			
			/* Save state from any plug-ins */
			for ( i=0, iLen=oSettings.aoStateSave.length ; i<iLen ; i++ )
			{
				sTmp = oSettings.aoStateSave[i].fn( oSettings, sValue );
				if ( sTmp !== "" )
				{
					sValue = sTmp;
				}
			}
			
			sValue += "}";
			
			_fnCreateCookie( oSettings.sCookiePrefix+oSettings.sInstance, sValue, 
				oSettings.iCookieDuration, oSettings.sCookiePrefix, oSettings.fnCookieCallback );
		}
		
		/*
		 * Function: _fnLoadState
		 * Purpose:  Attempt to load a saved table state from a cookie
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           object:oInit - DataTables init object so we can override settings
		 */
		function _fnLoadState ( oSettings, oInit )
		{
			if ( !oSettings.oFeatures.bStateSave )
			{
				return;
			}
			
			var oData, i, iLen;
			var sData = _fnReadCookie( oSettings.sCookiePrefix+oSettings.sInstance );
			if ( sData !== null && sData !== '' )
			{
				/* Try/catch the JSON eval - if it is bad then we ignore it - note that 1.7.0 and before
				 * incorrectly used single quotes for some strings - hence the replace below
				 */
				try
				{
					oData = (typeof $.parseJSON == 'function') ? 
						$.parseJSON( sData.replace(/'/g, '"') ) : eval( '('+sData+')' );
				}
				catch( e )
				{
					return;
				}
				
				/* Allow custom and plug-in manipulation functions to alter the data set which was
				 * saved, and also reject any saved state by returning false
				 */
				for ( i=0, iLen=oSettings.aoStateLoad.length ; i<iLen ; i++ )
				{
					if ( !oSettings.aoStateLoad[i].fn( oSettings, oData ) )
					{
						return;
					}
				}
				
				/* Store the saved state so it might be accessed at any time (particualrly a plug-in */
				oSettings.oLoadedState = $.extend( true, {}, oData );
				
				/* Restore key features */
				oSettings._iDisplayStart = oData.iStart;
				oSettings.iInitDisplayStart = oData.iStart;
				oSettings._iDisplayEnd = oData.iEnd;
				oSettings._iDisplayLength = oData.iLength;
				oSettings.oPreviousSearch.sSearch = decodeURIComponent(oData.sFilter);
				oSettings.aaSorting = oData.aaSorting.slice();
				oSettings.saved_aaSorting = oData.aaSorting.slice();
				
				/*
				 * Search filtering - global reference added in 1.4.1
				 * Note that we use a 'not' for the value of the regular expression indicator to maintain
				 * compatibility with pre 1.7 versions, where this was basically inverted. Added in 1.7.0
				 */
				if ( typeof oData.sFilterEsc != 'undefined' )
				{
					oSettings.oPreviousSearch.bRegex = !oData.sFilterEsc;
				}
				
				/* Column filtering - added in 1.5.0 beta 6 */
				if ( typeof oData.aaSearchCols != 'undefined' )
				{
					for ( i=0 ; i<oData.aaSearchCols.length ; i++ )
					{
						oSettings.aoPreSearchCols[i] = {
							"sSearch": decodeURIComponent(oData.aaSearchCols[i][0]),
							"bRegex": !oData.aaSearchCols[i][1]
						};
					}
				}
				
				/* Column visibility state - added in 1.5.0 beta 10 */
				if ( typeof oData.abVisCols != 'undefined' )
				{
					/* Pass back visibiliy settings to the init handler, but to do not here override
					 * the init object that the user might have passed in
					 */
					oInit.saved_aoColumns = [];
					for ( i=0 ; i<oData.abVisCols.length ; i++ )
					{
						oInit.saved_aoColumns[i] = {};
						oInit.saved_aoColumns[i].bVisible = oData.abVisCols[i];
					}
				}
			}
		}
		
		/*
		 * Function: _fnCreateCookie
		 * Purpose:  Create a new cookie with a value to store the state of a table
		 * Returns:  -
		 * Inputs:   string:sName - name of the cookie to create
		 *           string:sValue - the value the cookie should take
		 *           int:iSecs - duration of the cookie
		 *           string:sBaseName - sName is made up of the base + file name - this is the base
		 *           function:fnCallback - User definable function to modify the cookie
		 */
		function _fnCreateCookie ( sName, sValue, iSecs, sBaseName, fnCallback )
		{
			var date = new Date();
			date.setTime( date.getTime()+(iSecs*1000) );
			
			/* 
			 * Shocking but true - it would appear IE has major issues with having the path not having
			 * a trailing slash on it. We need the cookie to be available based on the path, so we
			 * have to append the file name to the cookie name. Appalling. Thanks to vex for adding the
			 * patch to use at least some of the path
			 */
			var aParts = window.location.pathname.split('/');
			var sNameFile = sName + '_' + aParts.pop().replace(/[\/:]/g,"").toLowerCase();
			var sFullCookie, oData;
			
			if ( fnCallback !== null )
			{
				oData = (typeof $.parseJSON == 'function') ? 
					$.parseJSON( sValue ) : eval( '('+sValue+')' );
				sFullCookie = fnCallback( sNameFile, oData, date.toGMTString(),
					aParts.join('/')+"/" );
			}
			else
			{
				sFullCookie = sNameFile + "=" + encodeURIComponent(sValue) +
					"; expires=" + date.toGMTString() +"; path=" + aParts.join('/')+"/";
			}
			
			/* Are we going to go over the cookie limit of 4KiB? If so, try to delete a cookies
			 * belonging to DataTables. This is FAR from bullet proof
			 */
			var sOldName="", iOldTime=9999999999999;
			var iLength = _fnReadCookie( sNameFile )!==null ? document.cookie.length : 
				sFullCookie.length + document.cookie.length;
			
			if ( iLength+10 > 4096 ) /* Magic 10 for padding */
			{
				var aCookies =document.cookie.split(';');
				for ( var i=0, iLen=aCookies.length ; i<iLen ; i++ )
				{
					if ( aCookies[i].indexOf( sBaseName ) != -1 )
					{
						/* It's a DataTables cookie, so eval it and check the time stamp */
						var aSplitCookie = aCookies[i].split('=');
						try { oData = eval( '('+decodeURIComponent(aSplitCookie[1])+')' ); }
						catch( e ) { continue; }
						
						if ( typeof oData.iCreate != 'undefined' && oData.iCreate < iOldTime )
						{
							sOldName = aSplitCookie[0];
							iOldTime = oData.iCreate;
						}
					}
				}
				
				if ( sOldName !== "" )
				{
					document.cookie = sOldName+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path="+
						aParts.join('/') + "/";
				}
			}
			
			document.cookie = sFullCookie;
		}
		
		/*
		 * Function: _fnReadCookie
		 * Purpose:  Read an old cookie to get a cookie with an old table state
		 * Returns:  string: - contents of the cookie - or null if no cookie with that name found
		 * Inputs:   string:sName - name of the cookie to read
		 */
		function _fnReadCookie ( sName )
		{
			var
				aParts = window.location.pathname.split('/'),
				sNameEQ = sName + '_' + aParts[aParts.length-1].replace(/[\/:]/g,"").toLowerCase() + '=',
			 	sCookieContents = document.cookie.split(';');
			
			for( var i=0 ; i<sCookieContents.length ; i++ )
			{
				var c = sCookieContents[i];
				
				while (c.charAt(0)==' ')
				{
					c = c.substring(1,c.length);
				}
				
				if (c.indexOf(sNameEQ) === 0)
				{
					return decodeURIComponent( c.substring(sNameEQ.length,c.length) );
				}
			}
			return null;
		}
		
		/*
		 * Function: _fnDetectHeader
		 * Purpose:  Use the DOM source to create up an array of header cells. The idea here is to
		 *           create a layout grid (array) of rows x columns, which contains a reference
		 *           to the cell that that point in the grid (regardless of col/rowspan), such that
		 *           any column / row could be removed and the new grid constructed
		 * Returns:  void
		 * Outputs:  array object:aLayout - Array to store the calculated layout in
		 * Inputs:   node:nThead - The header/footer element for the table
		 */
		function _fnDetectHeader ( aLayout, nThead )
		{
			var nTrs = nThead.getElementsByTagName('tr');
			var nCell;
			var i, j, k, l, iLen, jLen, iColShifted;
			var fnShiftCol = function ( a, i, j ) {
				while ( typeof a[i][j] != 'undefined' ) {
					j++;
				}
				return j;
			};

			aLayout.splice( 0, aLayout.length );
			
			/* We know how many rows there are in the layout - so prep it */
			for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
			{
				aLayout.push( [] );
			}
			
			/* Calculate a layout array */
			for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
			{
				var iColumn = 0;
				
				/* For every cell in the row... */
				for ( j=0, jLen=nTrs[i].childNodes.length ; j<jLen ; j++ )
				{
					nCell = nTrs[i].childNodes[j];

					if ( nCell.nodeName.toUpperCase() == "TD" ||
					     nCell.nodeName.toUpperCase() == "TH" )
					{
						/* Get the col and rowspan attributes from the DOM and sanitise them */
						var iColspan = nCell.getAttribute('colspan') * 1;
						var iRowspan = nCell.getAttribute('rowspan') * 1;
						iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
						iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;

						/* There might be colspan cells already in this row, so shift our target 
						 * accordingly
						 */
						iColShifted = fnShiftCol( aLayout, i, iColumn );
						
						/* If there is col / rowspan, copy the information into the layout grid */
						for ( l=0 ; l<iColspan ; l++ )
						{
							for ( k=0 ; k<iRowspan ; k++ )
							{
								aLayout[i+k][iColShifted+l] = {
									"cell": nCell,
									"unique": iColspan == 1 ? true : false
								};
								aLayout[i+k].nTr = nTrs[i];
							}
						}
					}
				}
			}
		}
		
		/*
		 * Function: _fnGetUniqueThs
		 * Purpose:  Get an array of unique th elements, one for each column
		 * Returns:  array node:aReturn - list of unique ths
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:nHeader - automatically detect the layout from this node - optional
		 *           array object:aLayout - thead/tfoot layout from _fnDetectHeader - optional
		 */
		function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
		{
			var aReturn = [];
			if ( typeof aLayout == 'undefined' )
			{
				aLayout = oSettings.aoHeader;
				if ( typeof nHeader != 'undefined' )
				{
					aLayout = [];
					_fnDetectHeader( aLayout, nHeader );
				}
			}

			for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
			{
				for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
				{
					if ( aLayout[i][j].unique && 
						 (typeof aReturn[j] == 'undefined' || !oSettings.bSortCellsTop) )
					{
						aReturn[j] = aLayout[i][j].cell;
					}
				}
			}
			
			return aReturn;
		}
		
		/*
		 * Function: _fnScrollBarWidth
		 * Purpose:  Get the width of a scroll bar in this browser being used
		 * Returns:  int: - width in pixels
		 * Inputs:   -
		 * Notes:    All credit for this function belongs to Alexandre Gomes. Thanks for sharing!
		 *   http://www.alexandre-gomes.com/?p=115
		 */
		function _fnScrollBarWidth ()
		{  
			var inner = document.createElement('p');  
			var style = inner.style;
			style.width = "100%";  
			style.height = "200px";  
			
			var outer = document.createElement('div');  
			style = outer.style;
			style.position = "absolute";  
			style.top = "0px";  
			style.left = "0px";  
			style.visibility = "hidden";  
			style.width = "200px";  
			style.height = "150px";  
			style.overflow = "hidden";  
			outer.appendChild(inner);  
			
			document.body.appendChild(outer);  
			var w1 = inner.offsetWidth;  
			outer.style.overflow = 'scroll';  
			var w2 = inner.offsetWidth;  
			if ( w1 == w2 )
			{
				w2 = outer.clientWidth;  
			}
			
			document.body.removeChild(outer); 
			return (w1 - w2);  
		}
		
		/*
		 * Function: _fnApplyToChildren
		 * Purpose:  Apply a given function to the display child nodes of an element array (typically
		 *   TD children of TR rows
		 * Returns:  - (done by reference)
		 * Inputs:   function:fn - Method to apply to the objects
		 *           array nodes:an1 - List of elements to look through for display children
		 *           array nodes:an2 - Another list (identical structure to the first) - optional
		 */
		function _fnApplyToChildren( fn, an1, an2 )
		{
			for ( var i=0, iLen=an1.length ; i<iLen ; i++ )
			{
				for ( var j=0, jLen=an1[i].childNodes.length ; j<jLen ; j++ )
				{
					if ( an1[i].childNodes[j].nodeType == 1 )
					{
						if ( typeof an2 != 'undefined' )
						{
							fn( an1[i].childNodes[j], an2[i].childNodes[j] );
						}
						else
						{
							fn( an1[i].childNodes[j] );
						}
					}
				}
			}
		}
		
		/*
		 * Function: _fnMap
		 * Purpose:  See if a property is defined on one object, if so assign it to the other object
		 * Returns:  - (done by reference)
		 * Inputs:   object:oRet - target object
		 *           object:oSrc - source object
		 *           string:sName - property
		 *           string:sMappedName - name to map too - optional, sName used if not given
		 */
		function _fnMap( oRet, oSrc, sName, sMappedName )
		{
			if ( typeof sMappedName == 'undefined' )
			{
				sMappedName = sName;
			}
			if ( typeof oSrc[sName] != 'undefined' )
			{
				oRet[sMappedName] = oSrc[sName];
			}
		}
		
		/*
		 * Function: _fnGetRowData
		 * Purpose:  Get an array of data for a given row from the internal data cache
		 * Returns:  array: - Data array
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iRow - aoData row id
		 *           string:sSpecific - data get type ('type' 'filter' 'sort')
		 */
		function _fnGetRowData( oSettings, iRow, sSpecific )
		{
			var out = [];
			for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				out.push( _fnGetCellData( oSettings, iRow, i, sSpecific ) );
			}
			return out;
		}
		
		/*
		 * Function: _fnGetCellData
		 * Purpose:  Get the data for a given cell from the internal cache, taking into account data mapping
		 * Returns:  *: - Cell data
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iRow - aoData row id
		 *           int:iCol - Column index
		 *           string:sSpecific - data get type ('display', 'type' 'filter' 'sort')
		 */
		function _fnGetCellData( oSettings, iRow, iCol, sSpecific )
		{
			var sData;
			var oCol = oSettings.aoColumns[iCol];
			var oData = oSettings.aoData[iRow]._aData;

			if ( (sData=oCol.fnGetData( oData )) === undefined )
			{
				if ( oSettings.iDrawError != oSettings.iDraw && oCol.sDefaultContent === null )
				{
					_fnLog( oSettings, 0, "Requested unknown parameter '"+oCol.mDataProp+
						"' from the data source for row "+iRow );
					oSettings.iDrawError = oSettings.iDraw;
				}
				return oCol.sDefaultContent;
			}

			/* When the data source is null, we can use default column data */
			if ( sData === null && oCol.sDefaultContent !== null )
			{
				sData = oCol.sDefaultContent;
			}

			if ( sSpecific == 'display' && sData === null )
			{
				return '';
			}
			return sData;
		}
		
		/*
		 * Function: _fnSetCellData
		 * Purpose:  Set the value for a specific cell, into the internal data cache
		 * Returns:  *: - Cell data
		 * Inputs:   object:oSettings - dataTables settings object
		 *           int:iRow - aoData row id
		 *           int:iCol - Column index
		 *           *:val - Value to set
		 */
		function _fnSetCellData( oSettings, iRow, iCol, val )
		{
			var oCol = oSettings.aoColumns[iCol];
			var oData = oSettings.aoData[iRow]._aData;

			oCol.fnSetData( oData, val );
		}
		
		/*
		 * Function: _fnGetObjectDataFn
		 * Purpose:  Return a function that can be used to get data from a source object, taking
		 *           into account the ability to use nested objects as a source
		 * Returns:  function: - Data get function
		 * Inputs:   string|int|function:mSource - The data source for the object
		 */
		function _fnGetObjectDataFn( mSource )
		{
			if ( mSource === null )
			{
				/* Give an empty string for rendering / sorting etc */
				return function (data) {
					return null;
				};
			}
			else if ( typeof mSource == 'function' )
			{
			    return function (data) {
			        return mSource( data );
			    };
			}
			else if ( typeof mSource == 'string' && mSource.indexOf('.') != -1 )
			{
				/* If there is a . in the source string then the data source is in a nested object
				 * we provide two 'quick' functions for the look up to speed up the most common
				 * operation, and a generalised one for when it is needed
				 */
				var a = mSource.split('.');
				if ( a.length == 2 )
				{
					return function (data) {
						return data[ a[0] ][ a[1] ];
					};
				}
				else if ( a.length == 3 )
				{
					return function (data) {
						return data[ a[0] ][ a[1] ][ a[2] ];
					};
				}
				else
				{
					return function (data) {
						for ( var i=0, iLen=a.length ; i<iLen ; i++ )
						{
							data = data[ a[i] ];
						}
						return data;
					};
				}
			}
			else
			{
				/* Array or flat object mapping */
				return function (data) {
					return data[mSource];	
				};
			}
		}
		
		/*
		 * Function: _fnSetObjectDataFn
		 * Purpose:  Return a function that can be used to set data from a source object, taking
		 *           into account the ability to use nested objects as a source
		 * Returns:  function: - Data set function
		 * Inputs:   string|int|function:mSource - The data source for the object
		 */
		function _fnSetObjectDataFn( mSource )
		{
			if ( mSource === null )
			{
				/* Nothing to do when the data source is null */
				return function (data, val) {};
			}
			else if ( typeof mSource == 'function' )
			{
			    return function (data, val) {
			        return mSource( data, val );
			    };
			}
			else if ( typeof mSource == 'string' && mSource.indexOf('.') != -1 )
			{
				/* Like the get, we need to get data from a nested object. Again two fast lookup
				 * functions are provided, and a generalised one.
				 */
				var a = mSource.split('.');
				if ( a.length == 2 )
				{
					return function (data, val) {
						data[ a[0] ][ a[1] ] = val;
					};
				}
				else if ( a.length == 3 )
				{
					return function (data, val) {
						data[ a[0] ][ a[1] ][ a[2] ] = val;
					};
				}
				else
				{
					return function (data, val) {
						for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
						{
							data = data[ a[i] ];
						}
						data[ a[a.length-1] ] = val;
					};
				}
			}
			else
			{
				/* Array or flat object mapping */
				return function (data, val) {
					data[mSource] = val;	
				};
			}
		}

		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - API
		 * I'm not happy with this solution... - To be fixed in 2.0
		 */
		this.oApi._fnExternApiFunc = _fnExternApiFunc;
		this.oApi._fnInitalise = _fnInitalise;
		this.oApi._fnInitComplete = _fnInitComplete;
		this.oApi._fnLanguageProcess = _fnLanguageProcess;
		this.oApi._fnAddColumn = _fnAddColumn;
		this.oApi._fnColumnOptions = _fnColumnOptions;
		this.oApi._fnAddData = _fnAddData;
		this.oApi._fnCreateTr = _fnCreateTr;
		this.oApi._fnGatherData = _fnGatherData;
		this.oApi._fnBuildHead = _fnBuildHead;
		this.oApi._fnDrawHead = _fnDrawHead;
		this.oApi._fnDraw = _fnDraw;
		this.oApi._fnReDraw = _fnReDraw;
		this.oApi._fnAjaxUpdate = _fnAjaxUpdate;
		this.oApi._fnAjaxUpdateDraw = _fnAjaxUpdateDraw;
		this.oApi._fnAddOptionsHtml = _fnAddOptionsHtml;
		this.oApi._fnFeatureHtmlTable = _fnFeatureHtmlTable;
		this.oApi._fnScrollDraw = _fnScrollDraw;
		this.oApi._fnAjustColumnSizing = _fnAjustColumnSizing;
		this.oApi._fnFeatureHtmlFilter = _fnFeatureHtmlFilter;
		this.oApi._fnFilterComplete = _fnFilterComplete;
		this.oApi._fnFilterCustom = _fnFilterCustom;
		this.oApi._fnFilterColumn = _fnFilterColumn;
		this.oApi._fnFilter = _fnFilter;
		this.oApi._fnBuildSearchArray = _fnBuildSearchArray;
		this.oApi._fnBuildSearchRow = _fnBuildSearchRow;
		this.oApi._fnFilterCreateSearch = _fnFilterCreateSearch;
		this.oApi._fnDataToSearch = _fnDataToSearch;
		this.oApi._fnSort = _fnSort;
		this.oApi._fnSortAttachListener = _fnSortAttachListener;
		this.oApi._fnSortingClasses = _fnSortingClasses;
		this.oApi._fnFeatureHtmlPaginate = _fnFeatureHtmlPaginate;
		this.oApi._fnPageChange = _fnPageChange;
		this.oApi._fnFeatureHtmlInfo = _fnFeatureHtmlInfo;
		this.oApi._fnUpdateInfo = _fnUpdateInfo;
		this.oApi._fnFeatureHtmlLength = _fnFeatureHtmlLength;
		this.oApi._fnFeatureHtmlProcessing = _fnFeatureHtmlProcessing;
		this.oApi._fnProcessingDisplay = _fnProcessingDisplay;
		this.oApi._fnVisibleToColumnIndex = _fnVisibleToColumnIndex;
		this.oApi._fnColumnIndexToVisible = _fnColumnIndexToVisible;
		this.oApi._fnNodeToDataIndex = _fnNodeToDataIndex;
		this.oApi._fnVisbleColumns = _fnVisbleColumns;
		this.oApi._fnCalculateEnd = _fnCalculateEnd;
		this.oApi._fnConvertToWidth = _fnConvertToWidth;
		this.oApi._fnCalculateColumnWidths = _fnCalculateColumnWidths;
		this.oApi._fnScrollingWidthAdjust = _fnScrollingWidthAdjust;
		this.oApi._fnGetWidestNode = _fnGetWidestNode;
		this.oApi._fnGetMaxLenString = _fnGetMaxLenString;
		this.oApi._fnStringToCss = _fnStringToCss;
		this.oApi._fnArrayCmp = _fnArrayCmp;
		this.oApi._fnDetectType = _fnDetectType;
		this.oApi._fnSettingsFromNode = _fnSettingsFromNode;
		this.oApi._fnGetDataMaster = _fnGetDataMaster;
		this.oApi._fnGetTrNodes = _fnGetTrNodes;
		this.oApi._fnGetTdNodes = _fnGetTdNodes;
		this.oApi._fnEscapeRegex = _fnEscapeRegex;
		this.oApi._fnDeleteIndex = _fnDeleteIndex;
		this.oApi._fnReOrderIndex = _fnReOrderIndex;
		this.oApi._fnColumnOrdering = _fnColumnOrdering;
		this.oApi._fnLog = _fnLog;
		this.oApi._fnClearTable = _fnClearTable;
		this.oApi._fnSaveState = _fnSaveState;
		this.oApi._fnLoadState = _fnLoadState;
		this.oApi._fnCreateCookie = _fnCreateCookie;
		this.oApi._fnReadCookie = _fnReadCookie;
		this.oApi._fnDetectHeader = _fnDetectHeader;
		this.oApi._fnGetUniqueThs = _fnGetUniqueThs;
		this.oApi._fnScrollBarWidth = _fnScrollBarWidth;
		this.oApi._fnApplyToChildren = _fnApplyToChildren;
		this.oApi._fnMap = _fnMap;
		this.oApi._fnGetRowData = _fnGetRowData;
		this.oApi._fnGetCellData = _fnGetCellData;
		this.oApi._fnSetCellData = _fnSetCellData;
		this.oApi._fnGetObjectDataFn = _fnGetObjectDataFn;
		this.oApi._fnSetObjectDataFn = _fnSetObjectDataFn;
		
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Section - Constructor
		 */
		
		/* Want to be able to reference "this" inside the this.each function */
		var _that = this;
		return this.each(function()
		{
			var i=0, iLen, j, jLen, k, kLen;
			
			/* Check to see if we are re-initalising a table */
			for ( i=0, iLen=_aoSettings.length ; i<iLen ; i++ )
			{
				/* Base check on table node */
				if ( _aoSettings[i].nTable == this )
				{
					if ( typeof oInit == 'undefined' || 
					   ( typeof oInit.bRetrieve != 'undefined' && oInit.bRetrieve === true ) )
					{
						return _aoSettings[i].oInstance;
					}
					else if ( typeof oInit.bDestroy != 'undefined' && oInit.bDestroy === true )
					{
						_aoSettings[i].oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( _aoSettings[i], 0, "Cannot reinitialise DataTable.\n\n"+
							"To retrieve the DataTables object for this table, please pass either no arguments "+
							"to the dataTable() function, or set bRetrieve to true. Alternatively, to destory "+
							"the old table and create a new one, set bDestroy to true (note that a lot of "+
							"changes to the configuration can be made through the API which is usually much "+
							"faster)." );
						return;
					}
				}
				
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destory the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( _aoSettings[i].sTableId !== "" && _aoSettings[i].sTableId == this.getAttribute('id') )
				{
					_aoSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Make a complete and independent copy of the settings object */
			var oSettings = new classSettings();
			_aoSettings.push( oSettings );
			
			var bInitHandedOff = false;
			var bUsePassedData = false;
			
			/* Set the id */
			var sId = this.getAttribute( 'id' );
			if ( sId !== null )
			{
				oSettings.sTableId = sId;
				oSettings.sInstance = sId;
			}
			else
			{
				oSettings.sInstance = _oExt._oExternConfig.iNextUnique ++;
			}
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( oSettings, 0, "Attempted to initialise DataTables on a node which is not a "+
					"table: "+this.nodeName );
				return;
			}
			
			/* Set the table node */
			oSettings.nTable = this;
			
			/* Keep a reference to the 'this' instance for the table. Note that if this table is being
			 * created with others, we retrieve a unique instance to ease API access.
			 */
			oSettings.oInstance = _that.length == 1 ? _that : $(this).dataTable();
			
			/* Bind the API functions to the settings, so we can perform actions whenever oSettings is
			 * available
			 */
			oSettings.oApi = _that.oApi;
			
			/* State the table's width for if a destroy is called at a later time */
			oSettings.sDestroyWidth = $(this).width();
			
			/* Store the features that we have available */
			if ( typeof oInit != 'undefined' && oInit !== null )
			{
				oSettings.oInit = oInit;
				_fnMap( oSettings.oFeatures, oInit, "bPaginate" );
				_fnMap( oSettings.oFeatures, oInit, "bLengthChange" );
				_fnMap( oSettings.oFeatures, oInit, "bFilter" );
				_fnMap( oSettings.oFeatures, oInit, "bSort" );
				_fnMap( oSettings.oFeatures, oInit, "bInfo" );
				_fnMap( oSettings.oFeatures, oInit, "bProcessing" );
				_fnMap( oSettings.oFeatures, oInit, "bAutoWidth" );
				_fnMap( oSettings.oFeatures, oInit, "bSortClasses" );
				_fnMap( oSettings.oFeatures, oInit, "bServerSide" );
				_fnMap( oSettings.oFeatures, oInit, "bDeferRender" );
				_fnMap( oSettings.oScroll, oInit, "sScrollX", "sX" );
				_fnMap( oSettings.oScroll, oInit, "sScrollXInner", "sXInner" );
				_fnMap( oSettings.oScroll, oInit, "sScrollY", "sY" );
				_fnMap( oSettings.oScroll, oInit, "bScrollCollapse", "bCollapse" );
				_fnMap( oSettings.oScroll, oInit, "bScrollInfinite", "bInfinite" );
				_fnMap( oSettings.oScroll, oInit, "iScrollLoadGap", "iLoadGap" );
				_fnMap( oSettings.oScroll, oInit, "bScrollAutoCss", "bAutoCss" );
				_fnMap( oSettings, oInit, "asStripClasses" );
				_fnMap( oSettings, oInit, "fnPreDrawCallback" );
				_fnMap( oSettings, oInit, "fnRowCallback" );
				_fnMap( oSettings, oInit, "fnHeaderCallback" );
				_fnMap( oSettings, oInit, "fnFooterCallback" );
				_fnMap( oSettings, oInit, "fnCookieCallback" );
				_fnMap( oSettings, oInit, "fnInitComplete" );
				_fnMap( oSettings, oInit, "fnServerData" );
				_fnMap( oSettings, oInit, "fnFormatNumber" );
				_fnMap( oSettings, oInit, "aaSorting" );
				_fnMap( oSettings, oInit, "aaSortingFixed" );
				_fnMap( oSettings, oInit, "aLengthMenu" );
				_fnMap( oSettings, oInit, "sPaginationType" );
				_fnMap( oSettings, oInit, "sAjaxSource" );
				_fnMap( oSettings, oInit, "sAjaxDataProp" );
				_fnMap( oSettings, oInit, "iCookieDuration" );
				_fnMap( oSettings, oInit, "sCookiePrefix" );
				_fnMap( oSettings, oInit, "sDom" );
				_fnMap( oSettings, oInit, "bSortCellsTop" );
				_fnMap( oSettings, oInit, "oSearch", "oPreviousSearch" );
				_fnMap( oSettings, oInit, "aoSearchCols", "aoPreSearchCols" );
				_fnMap( oSettings, oInit, "iDisplayLength", "_iDisplayLength" );
				_fnMap( oSettings, oInit, "bJQueryUI", "bJUI" );
				_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
				
				/* Callback functions which are array driven */
				if ( typeof oInit.fnDrawCallback == 'function' )
				{
					oSettings.aoDrawCallback.push( {
						"fn": oInit.fnDrawCallback,
						"sName": "user"
					} );
				}
				
				if ( typeof oInit.fnStateSaveCallback == 'function' )
				{
					oSettings.aoStateSave.push( {
						"fn": oInit.fnStateSaveCallback,
						"sName": "user"
					} );
				}
				
				if ( typeof oInit.fnStateLoadCallback == 'function' )
				{
					oSettings.aoStateLoad.push( {
						"fn": oInit.fnStateLoadCallback,
						"sName": "user"
					} );
				}
				
				if ( oSettings.oFeatures.bServerSide && oSettings.oFeatures.bSort &&
					   oSettings.oFeatures.bSortClasses )
				{
					/* Enable sort classes for server-side processing. Safe to do it here, since server-side
					 * processing must be enabled by the developer
					 */
					oSettings.aoDrawCallback.push( {
						"fn": _fnSortingClasses,
						"sName": "server_side_sort_classes"
					} );
				}
				else if ( oSettings.oFeatures.bDeferRender )
				{
					oSettings.aoDrawCallback.push( {
						"fn": _fnSortingClasses,
						"sName": "defer_sort_classes"
					} );
				}
				
				if ( typeof oInit.bJQueryUI != 'undefined' && oInit.bJQueryUI )
				{
					/* Use the JUI classes object for display. You could clone the oStdClasses object if 
					 * you want to have multiple tables with multiple independent classes 
					 */
					oSettings.oClasses = _oExt.oJUIClasses;
					
					if ( typeof oInit.sDom == 'undefined' )
					{
						/* Set the DOM to use a layout suitable for jQuery UI's theming */
						oSettings.sDom = '<"H"lfr>t<"F"ip>';
					}
				}
				
				/* Calculate the scroll bar width and cache it for use later on */
				if ( oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "" )
				{
					oSettings.oScroll.iBarWidth = _fnScrollBarWidth();
				}
				
				if ( typeof oInit.iDisplayStart != 'undefined' && 
				     typeof oSettings.iInitDisplayStart == 'undefined' )
				{
					/* Display start point, taking into account the save saving */
					oSettings.iInitDisplayStart = oInit.iDisplayStart;
					oSettings._iDisplayStart = oInit.iDisplayStart;
				}
				
				/* Must be done after everything which can be overridden by a cookie! */
				if ( typeof oInit.bStateSave != 'undefined' )
				{
					oSettings.oFeatures.bStateSave = oInit.bStateSave;
					_fnLoadState( oSettings, oInit );
					oSettings.aoDrawCallback.push( {
						"fn": _fnSaveState,
						"sName": "state_save"
					} );
				}

				if ( typeof oInit.iDeferLoading != 'undefined' )
				{
					oSettings.bDeferLoading = true;
					oSettings._iRecordsTotal = oInit.iDeferLoading;
					oSettings._iRecordsDisplay = oInit.iDeferLoading;
				}
				
				if ( typeof oInit.aaData != 'undefined' )
				{
					bUsePassedData = true;
				}
				
				/* Backwards compatability */
				/* aoColumns / aoData - remove at some point... */
				if ( typeof oInit != 'undefined' && typeof oInit.aoData != 'undefined' )
				{
					oInit.aoColumns = oInit.aoData;
				}
				
				/* Language definitions */
				if ( typeof oInit.oLanguage != 'undefined' )
				{
					if ( typeof oInit.oLanguage.sUrl != 'undefined' && oInit.oLanguage.sUrl !== "" )
					{
						/* Get the language definitions from a file */
						oSettings.oLanguage.sUrl = oInit.oLanguage.sUrl;
						$.getJSON( oSettings.oLanguage.sUrl, null, function( json ) { 
							_fnLanguageProcess( oSettings, json, true ); } );
						bInitHandedOff = true;
					}
					else
					{
						_fnLanguageProcess( oSettings, oInit.oLanguage, false );
					}
				}
				/* Warning: The _fnLanguageProcess function is async to the remainder of this function due
				 * to the XHR. We use _bInitialised in _fnLanguageProcess() to check this the processing 
				 * below is complete. The reason for spliting it like this is optimisation - we can fire
				 * off the XHR (if needed) and then continue processing the data.
				 */
			}
			else
			{
				/* Create a dummy object for quick manipulation later on. */
				oInit = {};
			}
			
			/*
			 * Stripes
			 * Add the strip classes now that we know which classes to apply - unless overruled
			 */
			if ( typeof oInit.asStripClasses == 'undefined' )
			{
				oSettings.asStripClasses.push( oSettings.oClasses.sStripOdd );
				oSettings.asStripClasses.push( oSettings.oClasses.sStripEven );
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var bStripeRemove = false;
			var anRows = $('>tbody>tr', this);
			for ( i=0, iLen=oSettings.asStripClasses.length ; i<iLen ; i++ )
			{
				if ( anRows.filter(":lt(2)").hasClass( oSettings.asStripClasses[i]) )
				{
					bStripeRemove = true;
					break;
				}
			}
					
			if ( bStripeRemove )
			{
				/* Store the classes which we are about to remove so they can be readded on destory */
				oSettings.asDestoryStrips = [ '', '' ];
				if ( $(anRows[0]).hasClass(oSettings.oClasses.sStripOdd) )
				{
					oSettings.asDestoryStrips[0] += oSettings.oClasses.sStripOdd+" ";
				}
				if ( $(anRows[0]).hasClass(oSettings.oClasses.sStripEven) )
				{
					oSettings.asDestoryStrips[0] += oSettings.oClasses.sStripEven;
				}
				if ( $(anRows[1]).hasClass(oSettings.oClasses.sStripOdd) )
				{
					oSettings.asDestoryStrips[1] += oSettings.oClasses.sStripOdd+" ";
				}
				if ( $(anRows[1]).hasClass(oSettings.oClasses.sStripEven) )
				{
					oSettings.asDestoryStrips[1] += oSettings.oClasses.sStripEven;
				}
				
				anRows.removeClass( oSettings.asStripClasses.join(' ') );
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( typeof oInit.aoColumns == 'undefined' )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				/* Check if we have column visibilty state to restore */
				if ( typeof oInit.saved_aoColumns != 'undefined' && oInit.saved_aoColumns.length == iLen )
				{
					if ( aoColumnsInit[i] === null )
					{
						aoColumnsInit[i] = {};
					}
					aoColumnsInit[i].bVisible = oInit.saved_aoColumns[i].bVisible;
				}
				
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Add options from column definations */
			if ( typeof oInit.aoColumnDefs != 'undefined' )
			{
				/* Loop over the column defs array - loop in reverse so first instace has priority */
				for ( i=oInit.aoColumnDefs.length-1 ; i>=0 ; i-- )
				{
					/* Each column def can target multiple columns, as it is an array */
					var aTargets = oInit.aoColumnDefs[i].aTargets;
					if ( !$.isArray( aTargets ) )
					{
						_fnLog( oSettings, 1, 'aTargets must be an array of targets, not a '+(typeof aTargets) );
					}
					for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
					{
						if ( typeof aTargets[j] == 'number' && aTargets[j] >= 0 )
						{
							/* 0+ integer, left to right column counting. We add columns which are unknown
							 * automatically. Is this the right behaviour for this? We should at least
							 * log it in future. We cannot do this for the negative or class targets, only here.
							 */
							while( oSettings.aoColumns.length <= aTargets[j] )
							{
								_fnAddColumn( oSettings );
							}
							_fnColumnOptions( oSettings, aTargets[j], oInit.aoColumnDefs[i] );
						}
						else if ( typeof aTargets[j] == 'number' && aTargets[j] < 0 )
						{
							/* Negative integer, right to left column counting */
							_fnColumnOptions( oSettings, oSettings.aoColumns.length+aTargets[j], 
								oInit.aoColumnDefs[i] );
						}
						else if ( typeof aTargets[j] == 'string' )
						{
							/* Class name matching on TH element */
							for ( k=0, kLen=oSettings.aoColumns.length ; k<kLen ; k++ )
							{
								if ( aTargets[j] == "_all" ||
								     $(oSettings.aoColumns[k].nTh).hasClass( aTargets[j] ) )
								{
									_fnColumnOptions( oSettings, k, oInit.aoColumnDefs[i] );
								}
							}
						}
					}
				}
			}
			
			/* Add options from column array - after the defs array so this has priority */
			if ( typeof aoColumnsInit != 'undefined' )
			{
				for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
				{
					_fnColumnOptions( oSettings, i, aoColumnsInit[i] );
				}
			}
			
			/*
			 * Sorting
			 * Check the aaSorting array
			 */
			for ( i=0, iLen=oSettings.aaSorting.length ; i<iLen ; i++ )
			{
				if ( oSettings.aaSorting[i][0] >= oSettings.aoColumns.length )
				{
					oSettings.aaSorting[i][0] = 0;
				}
				var oColumn = oSettings.aoColumns[ oSettings.aaSorting[i][0] ];
				
				/* Add a default sorting index */
				if ( typeof oSettings.aaSorting[i][2] == 'undefined' )
				{
					oSettings.aaSorting[i][2] = 0;
				}
				
				/* If aaSorting is not defined, then we use the first indicator in asSorting */
				if ( typeof oInit.aaSorting == "undefined" && 
						 typeof oSettings.saved_aaSorting == "undefined" )
				{
					oSettings.aaSorting[i][1] = oColumn.asSorting[0];
				}
				
				/* Set the current sorting index based on aoColumns.asSorting */
				for ( j=0, jLen=oColumn.asSorting.length ; j<jLen ; j++ )
				{
					if ( oSettings.aaSorting[i][1] == oColumn.asSorting[j] )
					{
						oSettings.aaSorting[i][2] = j;
						break;
					}
				}
			}
				
			/* Do a first pass on the sorting classes (allows any size changes to be taken into
			 * account, and also will apply sorting disabled classes if disabled
			 */
			_fnSortingClasses( oSettings );
			
			/*
			 * Final init
			 * Cache the header, body and footer as required, creating them if needed
			 */
			var thead = $('>thead', this);
			if ( thead.length === 0 )
			{
				thead = [ document.createElement( 'thead' ) ];
				this.appendChild( thead[0] );
			}
			oSettings.nTHead = thead[0];
			
			var tbody = $('>tbody', this);
			if ( tbody.length === 0 )
			{
				tbody = [ document.createElement( 'tbody' ) ];
				this.appendChild( tbody[0] );
			}
			oSettings.nTBody = tbody[0];
			
			var tfoot = $('>tfoot', this);
			if ( tfoot.length > 0 )
			{
				oSettings.nTFoot = tfoot[0];
				_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
			}
			
			/* Check if there is data passing into the constructor */
			if ( bUsePassedData )
			{
				for ( i=0 ; i<oInit.aaData.length ; i++ )
				{
					_fnAddData( oSettings, oInit.aaData[ i ] );
				}
			}
			else
			{
				/* Grab the data from the page */
				_fnGatherData( oSettings );
			}
			
			/* Copy the data index array */
			oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
			/* Initialisation complete - table can be drawn */
			oSettings.bInitialised = true;
			
			/* Check if we need to initialise the table (it might not have been handed off to the
			 * language processor)
			 */
			if ( bInitHandedOff === false )
			{
				_fnInitalise( oSettings );
			}
		});
	};
})(jQuery, window, document);

/**
 * Created by Viki.Feng on 21/01/2016.
 */
//Ajax Setup
$.ajaxSetup({
    //Check if session time out
    dataFilter: function (data, type) {
        //WARNING: Don't change the script string
        if (data == "<script type='text/javascript'>window.top.location.href='/home/loginPage';</script>") {
            alert(COMMON.common_message_SessionTimeout);
            window.top.location.href = '/home/loginPage';
        } else {
            return data;
        }
    }
});

//Function: Get Cookie
function getCookie(c_name) {
    var c_start, c_end;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

//Load Language Pack
var languageSetup = getCookie("Language");
if (languageSetup == "") {
    languageSetup = "en";
}
document.write('<script type="text/javascript" charset="utf-8" src="/staticmedia/i18n/messages_' + languageSetup + '.js"></script>');

/**
 * Created by Viki.Feng on 21/01/2016.
 */
//Login
function login() {
    var username = $("#txtUsername");
    var password = $("#txtPassword");
    if (username.length == 0 || username.val().length == 0) {
        alert(COMMON.login_message_UsernameNull);
        return false;
    }
    else {
    }
    if (password.length == 0 || password.val().length == 0) {
        alert(COMMON.login_message_PasswordNull);
        return false;
    }
    else {
    }

    $.ajax({
        url: "/home/login",
        data: JSON.stringify({"username" : username.val(), "password" : password.val()}),
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        async: true,
        success: function (responseText) {
            if (responseText.code == 0) {
                window.location.href = "/user/listPage";
            } else {
                alert(responseText.message);
            }
        },
        error: function () {
            alert(COMMON.common_message_Error);
        }
    });
}

//Check if user presses enter key
function checkEnterKey() {
    if (event.keyCode == 13) {
        login();
    }
}

//test
function test() {
    document.write("1");
}
/**
 * Created by Viki.Feng on 21/01/2016.
 */
//Edit User
function editOrAddUser(userId) {
    var title = "";
    if (userId == 0) {
        title = USER.user_text_AddUser;

        $("#txtUsername").val("");
        $("#txtPassword").val("");
    } else {
        title = USER.user_text_EditUser;

        $.ajax({
            url: "/user/user/" + userId,
            async: false,
            success: function (responseText) {
                if (responseText.code == 0) {
                    $("#txtUsername").val(responseText.data.username);
                    $("#txtPassword").val(responseText.data.password)
                } else {
                    alert(responseText.message);
                }
            },
            error: function () {
                alert(COMMON.common_message_Error);
            }
        });
    }

    currentUserId = userId;
    $('#dlgUserEdit').dialog("option", "title", title).dialog("open");
}

//Delete User
function deleteUser(userId) {
    if(confirm(USER.user_message_ConfirmDeleteUser)) {
        $.ajax({
            url: "/user/user/" + userId + "?_method=DELETE",
            type: "POST",
            async: true,
            success: function (responseText) {
                if (responseText.code == 0) {
                    window.location.href = window.location.href;
                } else {
                    alert(responseText.message);
                }
            },
            error: function () {
                alert(COMMON.common_message_Error);
            }
        });
    }
}

//test
function test() {
    document.write("2");
}
/*! jQuery UI - v1.11.4 - 2016-02-14
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, menu.js, progressbar.js, selectmenu.js, slider.js, spinner.js, tabs.js, tooltip.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */


// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.11.4",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	scrollParent: function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
			}).eq( 0 );

		return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
	},

	uniqueId: (function() {
		var uuid = 0;

		return function() {
			return this.each(function() {
				if ( !this.id ) {
					this.id = "ui-id-" + ( ++uuid );
				}
			});
		};
	})(),

	removeUniqueId: function() {
		return this.each(function() {
			if ( /^ui-id-\d+$/.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
		return !!img && visible( img );
	}
	return ( /^(input|select|textarea|button|object)$/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}

// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	disableSelection: (function() {
		var eventType = "onselectstart" in document.createElement( "div" ) ?
			"selectstart" :
			"mousedown";

		return function() {
			return this.bind( eventType + ".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
		};
	})(),

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	}
});

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
$.ui.plugin = {
	add: function( module, option, set ) {
		var i,
			proto = $.ui[ module ].prototype;
		for ( i in set ) {
			proto.plugins[ i ] = proto.plugins[ i ] || [];
			proto.plugins[ i ].push( [ option, set[ i ] ] );
		}
	},
	call: function( instance, name, args, allowDisconnected ) {
		var i,
			set = instance.plugins[ name ];

		if ( !set ) {
			return;
		}

		if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
			return;
		}

		for ( i = 0; i < set.length; i++ ) {
			if ( instance.options[ set[ i ][ 0 ] ] ) {
				set[ i ][ 1 ].apply( instance.element, args );
			}
		}
	}
};


/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat(args) );
			}

			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;


/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */


var mouseHandled = false;
$( document ).mouseup( function() {
	mouseHandled = false;
});

var mouse = $.widget("ui.mouse", {
	version: "1.11.4",
	options: {
		cancel: "input,textarea,button,select,option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind("mousedown." + this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind("click." + this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
					$.removeData(event.target, that.widgetName + ".preventClickEvent");
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind("." + this.widgetName);
		if ( this._mouseMoveDelegate ) {
			this.document
				.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if ( mouseHandled ) {
			return;
		}

		this._mouseMoved = false;

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};

		this.document
			.bind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.bind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if ( this._mouseMoved ) {
			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
				return this._mouseUp(event);

			// Iframe mouseup check - mouseup occurred in another document
			} else if ( !event.which ) {
				return this._mouseUp( event );
			}
		}

		if ( event.which || event.button ) {
			this._mouseMoved = true;
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		this.document
			.unbind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.unbind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		mouseHandled = false;
		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(/* event */) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(/* event */) {},
	_mouseDrag: function(/* event */) {},
	_mouseStop: function(/* event */) {},
	_mouseCapture: function(/* event */) { return true; }
});


/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

(function() {

$.ui = $.ui || {};

var cachedScrollbarWidth, supportsOffsetFractions,
	max = Math.max,
	abs = Math.abs,
	round = Math.round,
	rhorizontal = /left|center|right/,
	rvertical = /top|center|bottom/,
	roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	rposition = /^\w+/,
	rpercent = /%$/,
	_position = $.fn.position;

function getOffsets( offsets, width, height ) {
	return [
		parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
		parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
	];
}

function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}

function getDimensions( elem ) {
	var raw = elem[0];
	if ( raw.nodeType === 9 ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: 0, left: 0 }
		};
	}
	if ( $.isWindow( raw ) ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
		};
	}
	if ( raw.preventDefault ) {
		return {
			width: 0,
			height: 0,
			offset: { top: raw.pageY, left: raw.pageX }
		};
	}
	return {
		width: elem.outerWidth(),
		height: elem.outerHeight(),
		offset: elem.offset()
	};
}

$.position = {
	scrollbarWidth: function() {
		if ( cachedScrollbarWidth !== undefined ) {
			return cachedScrollbarWidth;
		}
		var w1, w2,
			div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
			innerDiv = div.children()[0];

		$( "body" ).append( div );
		w1 = innerDiv.offsetWidth;
		div.css( "overflow", "scroll" );

		w2 = innerDiv.offsetWidth;

		if ( w1 === w2 ) {
			w2 = div[0].clientWidth;
		}

		div.remove();

		return (cachedScrollbarWidth = w1 - w2);
	},
	getScrollInfo: function( within ) {
		var overflowX = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-x" ),
			overflowY = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-y" ),
			hasOverflowX = overflowX === "scroll" ||
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
			hasOverflowY = overflowY === "scroll" ||
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );
		return {
			width: hasOverflowY ? $.position.scrollbarWidth() : 0,
			height: hasOverflowX ? $.position.scrollbarWidth() : 0
		};
	},
	getWithinInfo: function( element ) {
		var withinElement = $( element || window ),
			isWindow = $.isWindow( withinElement[0] ),
			isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;
		return {
			element: withinElement,
			isWindow: isWindow,
			isDocument: isDocument,
			offset: withinElement.offset() || { left: 0, top: 0 },
			scrollLeft: withinElement.scrollLeft(),
			scrollTop: withinElement.scrollTop(),

			// support: jQuery 1.6.x
			// jQuery 1.6 doesn't support .outerWidth/Height() on documents or windows
			width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
			height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
		};
	}
};

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};

	dimensions = getDimensions( target );
	if ( target[0].preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
	}
	targetWidth = dimensions.width;
	targetHeight = dimensions.height;
	targetOffset = dimensions.offset;
	// clone to reuse original targetOffset later
	basePosition = $.extend( {}, targetOffset );

	// force my and at to have valid horizontal and vertical positions
	// if a value is missing or invalid, it will be converted to center
	$.each( [ "my", "at" ], function() {
		var pos = ( options[ this ] || "" ).split( " " ),
			horizontalOffset,
			verticalOffset;

		if ( pos.length === 1) {
			pos = rhorizontal.test( pos[ 0 ] ) ?
				pos.concat( [ "center" ] ) :
				rvertical.test( pos[ 0 ] ) ?
					[ "center" ].concat( pos ) :
					[ "center", "center" ];
		}
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

		// calculate offsets
		horizontalOffset = roffset.exec( pos[ 0 ] );
		verticalOffset = roffset.exec( pos[ 1 ] );
		offsets[ this ] = [
			horizontalOffset ? horizontalOffset[ 0 ] : 0,
			verticalOffset ? verticalOffset[ 0 ] : 0
		];

		// reduce to just the positions without the offsets
		options[ this ] = [
			rposition.exec( pos[ 0 ] )[ 0 ],
			rposition.exec( pos[ 1 ] )[ 0 ]
		];
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	if ( options.at[ 0 ] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[ 0 ] === "center" ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[ 1 ] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[ 1 ] === "center" ) {
		basePosition.top += targetHeight / 2;
	}

	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
	basePosition.left += atOffset[ 0 ];
	basePosition.top += atOffset[ 1 ];

	return this.each(function() {
		var collisionPosition, using,
			elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseCss( this, "marginLeft" ),
			marginTop = parseCss( this, "marginTop" ),
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
			position = $.extend( {}, basePosition ),
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

		if ( options.my[ 0 ] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[ 0 ] === "center" ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[ 1 ] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[ 1 ] === "center" ) {
			position.top -= elemHeight / 2;
		}

		position.left += myOffset[ 0 ];
		position.top += myOffset[ 1 ];

		// if the browser doesn't support fractions, then round for consistent results
		if ( !supportsOffsetFractions ) {
			position.left = round( position.left );
			position.top = round( position.top );
		}

		collisionPosition = {
			marginLeft: marginLeft,
			marginTop: marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[ i ] ] ) {
				$.ui.position[ collision[ i ] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
					my: options.my,
					at: options.at,
					within: within,
					elem: elem
				});
			}
		});

		if ( options.using ) {
			// adds feedback as second argument to using callback, if present
			using = function( props ) {
				var left = targetOffset.left - position.left,
					right = left + targetWidth - elemWidth,
					top = targetOffset.top - position.top,
					bottom = top + targetHeight - elemHeight,
					feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
					feedback.horizontal = "center";
				}
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
					feedback.vertical = "middle";
				}
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
					feedback.important = "horizontal";
				} else {
					feedback.important = "vertical";
				}
				options.using.call( this, props, feedback );
			};
		}

		elem.offset( $.extend( position, { using: using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			} else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) {
					position.top += myOffset + atOffset + offset;
				}
			} else if ( overBottom > 0 ) {
				newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( newOverTop > 0 || abs( newOverTop ) < overBottom ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			$.ui.position.flip.left.apply( this, arguments );
			$.ui.position.fit.left.apply( this, arguments );
		},
		top: function() {
			$.ui.position.flip.top.apply( this, arguments );
			$.ui.position.fit.top.apply( this, arguments );
		}
	}
};

// fraction support test
(function() {
	var testElement, testElementParent, testElementStyle, offsetLeft, i,
		body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" );

	//Create a "fake body" for testing based on method used in jQuery.support
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px;";

	offsetLeft = $( div ).offset().left;
	supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );
})();

})();

var position = $.ui.position;


/*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */


$.widget("ui.draggable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false,

		// callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function() {

		if ( this.options.helper === "original" ) {
			this._setPositionRelative();
		}
		if (this.options.addClasses){
			this.element.addClass("ui-draggable");
		}
		if (this.options.disabled){
			this.element.addClass("ui-draggable-disabled");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "handle" ) {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function() {
		if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
			this.destroyOnClear = true;
			return;
		}
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {
		var o = this.options;

		this._blurActiveElement( event );

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );

		return true;

	},

	_blockFrames: function( selector ) {
		this.iframeBlocks = this.document.find( selector ).map(function() {
			var iframe = $( this );

			return $( "<div>" )
				.css( "position", "absolute" )
				.appendTo( iframe.parent() )
				.outerWidth( iframe.outerWidth() )
				.outerHeight( iframe.outerHeight() )
				.offset( iframe.offset() )[ 0 ];
		});
	},

	_unblockFrames: function() {
		if ( this.iframeBlocks ) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_blurActiveElement: function( event ) {
		var document = this.document[ 0 ];

		// Only need to blur if the event occurred on the draggable itself, see #10527
		if ( !this.handleElement.is( event.target ) ) {
			return;
		}

		// support: IE9
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {

			// Support: IE9, IE10
			// If the <body> is blurred, IE will switch windows, see #9520
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {

				// Blur any element that currently has focus, see #4261
				$( document.activeElement ).blur();
			}
		} catch ( error ) {}
	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css( "position" );
		this.scrollParent = this.helper.scrollParent( true );
		this.offsetParent = this.helper.offsetParent();
		this.hasFixedAncestor = this.helper.parents().filter(function() {
				return $( this ).css( "position" ) === "fixed";
			}).length > 0;

		//The element's absolute position on the page minus margins
		this.positionAbs = this.element.offset();
		this._refreshOffsets( event );

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition( event, false );
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		// Reset helper's right/bottom css if they're set and set explicit width/height instead
		// as this prevents resizing of elements with right/bottom set (see #7772)
		this._normalizeRightBottom();

		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_refreshOffsets: function( event ) {
		this.offset = {
			top: this.positionAbs.top - this.margins.top,
			left: this.positionAbs.left - this.margins.left,
			scroll: false,
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset()
		};

		this.offset.click = {
			left: event.pageX - this.offset.left,
			top: event.pageY - this.offset.top
		};
	},

	_mouseDrag: function(event, noPropagation) {
		// reset any necessary cached properties (see #5009)
		if ( this.hasFixedAncestor ) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition( event, true );
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if (this._trigger("drag", event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		this.helper[ 0 ].style.left = this.position.left + "px";
		this.helper[ 0 ].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
			dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if (that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if (this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function( event ) {
		this._unblockFrames();

		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// Only need to focus if the event occurred on the draggable itself, see #10527
		if ( this.handleElement.is( event.target ) ) {
			// The interaction is over; whether or not the click resulted in a drag, focus the element
			this.element.focus();
		}

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {
		return this.options.handle ?
			!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
			true;
	},

	_setHandleClassName: function() {
		this.handleElement = this.options.handle ?
			this.element.find( this.options.handle ) : this.element;
		this.handleElement.addClass( "ui-draggable-handle" );
	},

	_removeHandleClassName: function() {
		this.handleElement.removeClass( "ui-draggable-handle" );
	},

	_createHelper: function(event) {

		var o = this.options,
			helperIsFunction = $.isFunction( o.helper ),
			helper = helperIsFunction ?
				$( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
				( o.helper === "clone" ?
					this.element.clone().removeAttr( "id" ) :
					this.element );

		if (!helper.parents("body").length) {
			helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
		}

		// http://bugs.jqueryui.com/ticket/9446
		// a helper function can return the original element
		// which wouldn't have been set to relative in _create
		if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
			this._setPositionRelative();
		}

		if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;

	},

	_setPositionRelative: function() {
		if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
			this.element[ 0 ].style.position = "relative";
		}
	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = { left: +obj[0], top: +obj[1] || 0 };
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_isRootNode: function( element ) {
		return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
			document = this.document[ 0 ];

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};

	},

	_getRelativeOffset: function() {
		if ( this.cssPosition !== "relative" ) {
			return { top: 0, left: 0 };
		}

		var p = this.element.position(),
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: p.top - ( parseInt(this.helper.css( "top" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
			left: p.left - ( parseInt(this.helper.css( "left" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
		};

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"), 10) || 0),
			top: (parseInt(this.element.css("marginTop"), 10) || 0),
			right: (parseInt(this.element.css("marginRight"), 10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var isUserScrollable, c, ce,
			o = this.options,
			document = this.document[ 0 ];

		this.relativeContainer = null;

		if ( !o.containment ) {
			this.containment = null;
			return;
		}

		if ( o.containment === "window" ) {
			this.containment = [
				$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
				$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
				$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,
				$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment === "document") {
			this.containment = [
				0,
				0,
				$( document ).width() - this.helperProportions.width - this.margins.left,
				( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment.constructor === Array ) {
			this.containment = o.containment;
			return;
		}

		if ( o.containment === "parent" ) {
			o.containment = this.helper[ 0 ].parentNode;
		}

		c = $( o.containment );
		ce = c[ 0 ];

		if ( !ce ) {
			return;
		}

		isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );

		this.containment = [
			( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
			( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
			( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
				( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
				this.helperProportions.width -
				this.margins.left -
				this.margins.right,
			( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
				( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
				this.helperProportions.height -
				this.margins.top -
				this.margins.bottom
		];
		this.relativeContainer = c;
	},

	_convertPositionTo: function(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod)
			)
		};

	},

	_generatePosition: function( event, constrainPosition ) {

		var containment, co, top, left,
			o = this.options,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
			pageX = event.pageX,
			pageY = event.pageY;

		// Cache the scroll
		if ( !scrollIsRootNode || !this.offset.scroll ) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		// If we are not dragging yet, we won't check for options
		if ( constrainPosition ) {
			if ( this.containment ) {
				if ( this.relativeContainer ){
					co = this.relativeContainer.offset();
					containment = [
						this.containment[ 0 ] + co.left,
						this.containment[ 1 ] + co.top,
						this.containment[ 2 ] + co.left,
						this.containment[ 3 ] + co.top
					];
				} else {
					containment = this.containment;
				}

				if (event.pageX - this.offset.click.left < containment[0]) {
					pageX = containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < containment[1]) {
					pageY = containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > containment[2]) {
					pageX = containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > containment[3]) {
					pageY = containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

			if ( o.axis === "y" ) {
				pageX = this.originalPageX;
			}

			if ( o.axis === "x" ) {
				pageY = this.originalPageY;
			}
		}

		return {
			top: (
				pageY -																	// The absolute mouse position
				this.offset.click.top	-												// Click offset (relative to the element)
				this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
			),
			left: (
				pageX -																	// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
			this.helper.remove();
		}
		this.helper = null;
		this.cancelHelperRemoval = false;
		if ( this.destroyOnClear ) {
			this.destroy();
		}
	},

	_normalizeRightBottom: function() {
		if ( this.options.axis !== "y" && this.helper.css( "right" ) !== "auto" ) {
			this.helper.width( this.helper.width() );
			this.helper.css( "right", "auto" );
		}
		if ( this.options.axis !== "x" && this.helper.css( "bottom" ) !== "auto" ) {
			this.helper.height( this.helper.height() );
			this.helper.css( "bottom", "auto" );
		}
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function( type, event, ui ) {
		ui = ui || this._uiHash();
		$.ui.plugin.call( this, type, [ event, ui, this ], true );

		// Absolute position and offset (see #6884 ) have to be recalculated after plugins
		if ( /^(drag|start|stop)/.test( type ) ) {
			this.positionAbs = this._convertPositionTo( "absolute" );
			ui.offset = this.positionAbs;
		}
		return $.Widget.prototype._trigger.call( this, type, event, ui );
	},

	plugins: {},

	_uiHash: function() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add( "draggable", "connectToSortable", {
	start: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.sortables = [];
		$( draggable.options.connectToSortable ).each(function() {
			var sortable = $( this ).sortable( "instance" );

			if ( sortable && !sortable.options.disabled ) {
				draggable.sortables.push( sortable );

				// refreshPositions is called at drag start to refresh the containerCache
				// which is used in drag. This ensures it's initialized and synchronized
				// with any changes that might have happened on the page since initialization.
				sortable.refreshPositions();
				sortable._trigger("activate", event, uiSortable);
			}
		});
	},
	stop: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.cancelHelperRemoval = false;

		$.each( draggable.sortables, function() {
			var sortable = this;

			if ( sortable.isOver ) {
				sortable.isOver = 0;

				// Allow this sortable to handle removing the helper
				draggable.cancelHelperRemoval = true;
				sortable.cancelHelperRemoval = false;

				// Use _storedCSS To restore properties in the sortable,
				// as this also handles revert (#9675) since the draggable
				// may have modified them in unexpected ways (#8809)
				sortable._storedCSS = {
					position: sortable.placeholder.css( "position" ),
					top: sortable.placeholder.css( "top" ),
					left: sortable.placeholder.css( "left" )
				};

				sortable._mouseStop(event);

				// Once drag has ended, the sortable should return to using
				// its original helper, not the shared helper from draggable
				sortable.options.helper = sortable.options._helper;
			} else {
				// Prevent this Sortable from removing the helper.
				// However, don't set the draggable to remove the helper
				// either as another connected Sortable may yet handle the removal.
				sortable.cancelHelperRemoval = true;

				sortable._trigger( "deactivate", event, uiSortable );
			}
		});
	},
	drag: function( event, ui, draggable ) {
		$.each( draggable.sortables, function() {
			var innermostIntersecting = false,
				sortable = this;

			// Copy over variables that sortable's _intersectsWith uses
			sortable.positionAbs = draggable.positionAbs;
			sortable.helperProportions = draggable.helperProportions;
			sortable.offset.click = draggable.offset.click;

			if ( sortable._intersectsWith( sortable.containerCache ) ) {
				innermostIntersecting = true;

				$.each( draggable.sortables, function() {
					// Copy over variables that sortable's _intersectsWith uses
					this.positionAbs = draggable.positionAbs;
					this.helperProportions = draggable.helperProportions;
					this.offset.click = draggable.offset.click;

					if ( this !== sortable &&
							this._intersectsWith( this.containerCache ) &&
							$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
						innermostIntersecting = false;
					}

					return innermostIntersecting;
				});
			}

			if ( innermostIntersecting ) {
				// If it intersects, we use a little isOver variable and set it once,
				// so that the move-in stuff gets fired only once.
				if ( !sortable.isOver ) {
					sortable.isOver = 1;

					// Store draggable's parent in case we need to reappend to it later.
					draggable._parent = ui.helper.parent();

					sortable.currentItem = ui.helper
						.appendTo( sortable.element )
						.data( "ui-sortable-item", true );

					// Store helper option to later restore it
					sortable.options._helper = sortable.options.helper;

					sortable.options.helper = function() {
						return ui.helper[ 0 ];
					};

					// Fire the start events of the sortable with our passed browser event,
					// and our own helper (so it doesn't create a new one)
					event.target = sortable.currentItem[ 0 ];
					sortable._mouseCapture( event, true );
					sortable._mouseStart( event, true, true );

					// Because the browser event is way off the new appended portlet,
					// modify necessary variables to reflect the changes
					sortable.offset.click.top = draggable.offset.click.top;
					sortable.offset.click.left = draggable.offset.click.left;
					sortable.offset.parent.left -= draggable.offset.parent.left -
						sortable.offset.parent.left;
					sortable.offset.parent.top -= draggable.offset.parent.top -
						sortable.offset.parent.top;

					draggable._trigger( "toSortable", event );

					// Inform draggable that the helper is in a valid drop zone,
					// used solely in the revert option to handle "valid/invalid".
					draggable.dropped = sortable.element;

					// Need to refreshPositions of all sortables in the case that
					// adding to one sortable changes the location of the other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});

					// hack so receive/update callbacks work (mostly)
					draggable.currentItem = draggable.element;
					sortable.fromOutside = draggable;
				}

				if ( sortable.currentItem ) {
					sortable._mouseDrag( event );
					// Copy the sortable's position because the draggable's can potentially reflect
					// a relative position, while sortable is always absolute, which the dragged
					// element has now become. (#8809)
					ui.position = sortable.position;
				}
			} else {
				// If it doesn't intersect with the sortable, and it intersected before,
				// we fake the drag stop of the sortable, but make sure it doesn't remove
				// the helper by using cancelHelperRemoval.
				if ( sortable.isOver ) {

					sortable.isOver = 0;
					sortable.cancelHelperRemoval = true;

					// Calling sortable's mouseStop would trigger a revert,
					// so revert must be temporarily false until after mouseStop is called.
					sortable.options._revert = sortable.options.revert;
					sortable.options.revert = false;

					sortable._trigger( "out", event, sortable._uiHash( sortable ) );
					sortable._mouseStop( event, true );

					// restore sortable behaviors that were modfied
					// when the draggable entered the sortable area (#9481)
					sortable.options.revert = sortable.options._revert;
					sortable.options.helper = sortable.options._helper;

					if ( sortable.placeholder ) {
						sortable.placeholder.remove();
					}

					// Restore and recalculate the draggable's offset considering the sortable
					// may have modified them in unexpected ways. (#8809, #10669)
					ui.helper.appendTo( draggable._parent );
					draggable._refreshOffsets( event );
					ui.position = draggable._generatePosition( event, true );

					draggable._trigger( "fromSortable", event );

					// Inform draggable that the helper is no longer in a valid drop zone
					draggable.dropped = false;

					// Need to refreshPositions of all sortables just in case removing
					// from one sortable changes the location of other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});
				}
			}
		});
	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function( event, ui, instance ) {
		var t = $( "body" ),
			o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._opacity) {
			$(ui.helper).css("opacity", o._opacity);
		}
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function( event, ui, i ) {
		if ( !i.scrollParentNotHidden ) {
			i.scrollParentNotHidden = i.helper.scrollParent( false );
		}

		if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] && i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function( event, ui, i  ) {

		var o = i.options,
			scrolled = false,
			scrollParent = i.scrollParentNotHidden[ 0 ],
			document = i.document[ 0 ];

		if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
			if ( !o.axis || o.axis !== "x" ) {
				if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if ( !o.axis || o.axis !== "y" ) {
				if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
				} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
				}
			}

		} else {

			if (!o.axis || o.axis !== "x") {
				if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}
			}

		}

		if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(i, event);
		}

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function( event, ui, i ) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {
			var $t = $(this),
				$o = $t.offset();
			if (this !== i.element[0]) {
				i.snapElements.push({
					item: this,
					width: $t.outerWidth(), height: $t.outerHeight(),
					top: $o.top, left: $o.left
				});
			}
		});

	},
	drag: function( event, ui, inst ) {

		var ts, bs, ls, rs, l, r, t, b, i, first,
			o = inst.options,
			d = o.snapTolerance,
			x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--){

			l = inst.snapElements[i].left - inst.margins.left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top - inst.margins.top;
			b = t + inst.snapElements[i].height;

			if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {
				if (inst.snapElements[i].snapping) {
					(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				}
				inst.snapElements[i].snapping = false;
				continue;
			}

			if (o.snapMode !== "inner") {
				ts = Math.abs(t - y2) <= d;
				bs = Math.abs(b - y1) <= d;
				ls = Math.abs(l - x2) <= d;
				rs = Math.abs(r - x1) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left;
				}
			}

			first = (ts || bs || ls || rs);

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			}
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		}

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function( event, ui, instance ) {
		var min,
			o = instance.options,
			group = $.makeArray($(o.stack)).sort(function(a, b) {
				return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
			});

		if (!group.length) { return; }

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function(i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", (min + group.length));
	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui.helper).css("zIndex", o._zIndex);
		}
	}
});

var draggable = $.ui.draggable;


/*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */


$.widget( "ui.droppable", {
	version: "1.11.4",
	widgetEventPrefix: "drop",
	options: {
		accept: "*",
		activeClass: false,
		addClasses: true,
		greedy: false,
		hoverClass: false,
		scope: "default",
		tolerance: "intersect",

		// callbacks
		activate: null,
		deactivate: null,
		drop: null,
		out: null,
		over: null
	},
	_create: function() {

		var proportions,
			o = this.options,
			accept = o.accept;

		this.isover = false;
		this.isout = true;

		this.accept = $.isFunction( accept ) ? accept : function( d ) {
			return d.is( accept );
		};

		this.proportions = function( /* valueToWrite */ ) {
			if ( arguments.length ) {
				// Store the droppable's proportions
				proportions = arguments[ 0 ];
			} else {
				// Retrieve or derive the droppable's proportions
				return proportions ?
					proportions :
					proportions = {
						width: this.element[ 0 ].offsetWidth,
						height: this.element[ 0 ].offsetHeight
					};
			}
		};

		this._addToManager( o.scope );

		o.addClasses && this.element.addClass( "ui-droppable" );

	},

	_addToManager: function( scope ) {
		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[ scope ] = $.ui.ddmanager.droppables[ scope ] || [];
		$.ui.ddmanager.droppables[ scope ].push( this );
	},

	_splice: function( drop ) {
		var i = 0;
		for ( ; i < drop.length; i++ ) {
			if ( drop[ i ] === this ) {
				drop.splice( i, 1 );
			}
		}
	},

	_destroy: function() {
		var drop = $.ui.ddmanager.droppables[ this.options.scope ];

		this._splice( drop );

		this.element.removeClass( "ui-droppable ui-droppable-disabled" );
	},

	_setOption: function( key, value ) {

		if ( key === "accept" ) {
			this.accept = $.isFunction( value ) ? value : function( d ) {
				return d.is( value );
			};
		} else if ( key === "scope" ) {
			var drop = $.ui.ddmanager.droppables[ this.options.scope ];

			this._splice( drop );
			this._addToManager( value );
		}

		this._super( key, value );
	},

	_activate: function( event ) {
		var draggable = $.ui.ddmanager.current;
		if ( this.options.activeClass ) {
			this.element.addClass( this.options.activeClass );
		}
		if ( draggable ){
			this._trigger( "activate", event, this.ui( draggable ) );
		}
	},

	_deactivate: function( event ) {
		var draggable = $.ui.ddmanager.current;
		if ( this.options.activeClass ) {
			this.element.removeClass( this.options.activeClass );
		}
		if ( draggable ){
			this._trigger( "deactivate", event, this.ui( draggable ) );
		}
	},

	_over: function( event ) {

		var draggable = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.hoverClass ) {
				this.element.addClass( this.options.hoverClass );
			}
			this._trigger( "over", event, this.ui( draggable ) );
		}

	},

	_out: function( event ) {

		var draggable = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.hoverClass ) {
				this.element.removeClass( this.options.hoverClass );
			}
			this._trigger( "out", event, this.ui( draggable ) );
		}

	},

	_drop: function( event, custom ) {

		var draggable = custom || $.ui.ddmanager.current,
			childrenIntersection = false;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return false;
		}

		this.element.find( ":data(ui-droppable)" ).not( ".ui-draggable-dragging" ).each(function() {
			var inst = $( this ).droppable( "instance" );
			if (
				inst.options.greedy &&
				!inst.options.disabled &&
				inst.options.scope === draggable.options.scope &&
				inst.accept.call( inst.element[ 0 ], ( draggable.currentItem || draggable.element ) ) &&
				$.ui.intersect( draggable, $.extend( inst, { offset: inst.element.offset() } ), inst.options.tolerance, event )
			) { childrenIntersection = true; return false; }
		});
		if ( childrenIntersection ) {
			return false;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.activeClass ) {
				this.element.removeClass( this.options.activeClass );
			}
			if ( this.options.hoverClass ) {
				this.element.removeClass( this.options.hoverClass );
			}
			this._trigger( "drop", event, this.ui( draggable ) );
			return this.element;
		}

		return false;

	},

	ui: function( c ) {
		return {
			draggable: ( c.currentItem || c.element ),
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	}

});

$.ui.intersect = (function() {
	function isOverAxis( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	}

	return function( draggable, droppable, toleranceMode, event ) {

		if ( !droppable.offset ) {
			return false;
		}

		var x1 = ( draggable.positionAbs || draggable.position.absolute ).left + draggable.margins.left,
			y1 = ( draggable.positionAbs || draggable.position.absolute ).top + draggable.margins.top,
			x2 = x1 + draggable.helperProportions.width,
			y2 = y1 + draggable.helperProportions.height,
			l = droppable.offset.left,
			t = droppable.offset.top,
			r = l + droppable.proportions().width,
			b = t + droppable.proportions().height;

		switch ( toleranceMode ) {
		case "fit":
			return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
		case "intersect":
			return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
				x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
				t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
				y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
		case "pointer":
			return isOverAxis( event.pageY, t, droppable.proportions().height ) && isOverAxis( event.pageX, l, droppable.proportions().width );
		case "touch":
			return (
				( y1 >= t && y1 <= b ) || // Top edge touching
				( y2 >= t && y2 <= b ) || // Bottom edge touching
				( y1 < t && y2 > b ) // Surrounded vertically
			) && (
				( x1 >= l && x1 <= r ) || // Left edge touching
				( x2 >= l && x2 <= r ) || // Right edge touching
				( x1 < l && x2 > r ) // Surrounded horizontally
			);
		default:
			return false;
		}
	};
})();

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: { "default": [] },
	prepareOffsets: function( t, event ) {

		var i, j,
			m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
			type = event ? event.type : null, // workaround for #2317
			list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

		droppablesLoop: for ( i = 0; i < m.length; i++ ) {

			// No disabled and non-accepted
			if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
				continue;
			}

			// Filter out elements in the current dragged item
			for ( j = 0; j < list.length; j++ ) {
				if ( list[ j ] === m[ i ].element[ 0 ] ) {
					m[ i ].proportions().height = 0;
					continue droppablesLoop;
				}
			}

			m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
			if ( !m[ i ].visible ) {
				continue;
			}

			// Activate the droppable if used directly from draggables
			if ( type === "mousedown" ) {
				m[ i ]._activate.call( m[ i ], event );
			}

			m[ i ].offset = m[ i ].element.offset();
			m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth, height: m[ i ].element[ 0 ].offsetHeight });

		}

	},
	drop: function( draggable, event ) {

		var dropped = false;
		// Create a copy of the droppables in case the list changes during the drop (#9116)
		$.each( ( $.ui.ddmanager.droppables[ draggable.options.scope ] || [] ).slice(), function() {

			if ( !this.options ) {
				return;
			}
			if ( !this.options.disabled && this.visible && $.ui.intersect( draggable, this, this.options.tolerance, event ) ) {
				dropped = this._drop.call( this, event ) || dropped;
			}

			if ( !this.options.disabled && this.visible && this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
				this.isout = true;
				this.isover = false;
				this._deactivate.call( this, event );
			}

		});
		return dropped;

	},
	dragStart: function( draggable, event ) {
		// Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
		draggable.element.parentsUntil( "body" ).bind( "scroll.droppable", function() {
			if ( !draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
		});
	},
	drag: function( draggable, event ) {

		// If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if ( draggable.options.refreshPositions ) {
			$.ui.ddmanager.prepareOffsets( draggable, event );
		}

		// Run through all droppables and check their positions based on specific tolerance options
		$.each( $.ui.ddmanager.droppables[ draggable.options.scope ] || [], function() {

			if ( this.options.disabled || this.greedyChild || !this.visible ) {
				return;
			}

			var parentInstance, scope, parent,
				intersects = $.ui.intersect( draggable, this, this.options.tolerance, event ),
				c = !intersects && this.isover ? "isout" : ( intersects && !this.isover ? "isover" : null );
			if ( !c ) {
				return;
			}

			if ( this.options.greedy ) {
				// find droppable parents with same scope
				scope = this.options.scope;
				parent = this.element.parents( ":data(ui-droppable)" ).filter(function() {
					return $( this ).droppable( "instance" ).options.scope === scope;
				});

				if ( parent.length ) {
					parentInstance = $( parent[ 0 ] ).droppable( "instance" );
					parentInstance.greedyChild = ( c === "isover" );
				}
			}

			// we just moved into a greedy child
			if ( parentInstance && c === "isover" ) {
				parentInstance.isover = false;
				parentInstance.isout = true;
				parentInstance._out.call( parentInstance, event );
			}

			this[ c ] = true;
			this[c === "isout" ? "isover" : "isout"] = false;
			this[c === "isover" ? "_over" : "_out"].call( this, event );

			// we just moved out of a greedy child
			if ( parentInstance && c === "isout" ) {
				parentInstance.isout = false;
				parentInstance.isover = true;
				parentInstance._over.call( parentInstance, event );
			}
		});

	},
	dragStop: function( draggable, event ) {
		draggable.element.parentsUntil( "body" ).unbind( "scroll.droppable" );
		// Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
		if ( !draggable.options.refreshPositions ) {
			$.ui.ddmanager.prepareOffsets( draggable, event );
		}
	}
};

var droppable = $.ui.droppable;


/*!
 * jQuery UI Resizable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */


$.widget("ui.resizable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,
		// See #7960
		zIndex: 90,

		// callbacks
		resize: null,
		start: null,
		stop: null
	},

	_num: function( value ) {
		return parseInt( value, 10 ) || 0;
	},

	_isNumber: function( value ) {
		return !isNaN( parseInt( value, 10 ) );
	},

	_hasScroll: function( el, a ) {

		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	_create: function() {

		var n, i, handle, axis, hname,
			that = this,
			o = this.options;
		this.element.addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!(o.aspectRatio),
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
		});

		// Wrap the element if it cannot hold child nodes
		if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {

			this.element.wrap(
				$("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})
			);

			this.element = this.element.parent().data(
				"ui-resizable", this.element.resizable( "instance" )
			);

			this.elementIsWrapper = true;

			this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			});
			this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			});
			// support: Safari
			// Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css("resize");
			this.originalElement.css("resize", "none");

			this._proportionallyResizeElements.push( this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			}) );

			// support: IE9
			// avoid IE jump (hard set the margin)
			this.originalElement.css({ margin: this.originalElement.css("margin") });

			this._proportionallyResize();
		}

		this.handles = o.handles ||
			( !$(".ui-resizable-handle", this.element).length ?
				"e,s,se" : {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} );

		this._handles = $();
		if ( this.handles.constructor === String ) {

			if ( this.handles === "all") {
				this.handles = "n,e,s,w,se,sw,ne,nw";
			}

			n = this.handles.split(",");
			this.handles = {};

			for (i = 0; i < n.length; i++) {

				handle = $.trim(n[i]);
				hname = "ui-resizable-" + handle;
				axis = $("<div class='ui-resizable-handle " + hname + "'></div>");

				axis.css({ zIndex: o.zIndex });

				// TODO : What's going on here?
				if ("se" === handle) {
					axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
				}

				this.handles[handle] = ".ui-resizable-" + handle;
				this.element.append(axis);
			}

		}

		this._renderAxis = function(target) {

			var i, axis, padPos, padWrapper;

			target = target || this.element;

			for (i in this.handles) {

				if (this.handles[i].constructor === String) {
					this.handles[i] = this.element.children( this.handles[ i ] ).first().show();
				} else if ( this.handles[ i ].jquery || this.handles[ i ].nodeType ) {
					this.handles[ i ] = $( this.handles[ i ] );
					this._on( this.handles[ i ], { "mousedown": that._mouseDown });
				}

				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {

					axis = $(this.handles[i], this.element);

					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					padPos = [ "padding",
						/ne|nw|n/.test(i) ? "Top" :
						/se|sw|s/.test(i) ? "Bottom" :
						/^e$/.test(i) ? "Right" : "Left" ].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();
				}

				this._handles = this._handles.add( this.handles[ i ] );
			}
		};

		// TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = this._handles.add( this.element.find( ".ui-resizable-handle" ) );
		this._handles.disableSelection();

		this._handles.mouseover(function() {
			if (!that.resizing) {
				if (this.className) {
					axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				}
				that.axis = axis && axis[1] ? axis[1] : "se";
			}
		});

		if (o.autoHide) {
			this._handles.hide();
			$(this.element)
				.addClass("ui-resizable-autohide")
				.mouseenter(function() {
					if (o.disabled) {
						return;
					}
					$(this).removeClass("ui-resizable-autohide");
					that._handles.show();
				})
				.mouseleave(function() {
					if (o.disabled) {
						return;
					}
					if (!that.resizing) {
						$(this).addClass("ui-resizable-autohide");
						that._handles.hide();
					}
				});
		}

		this._mouseInit();
	},

	_destroy: function() {

		this._mouseDestroy();

		var wrapper,
			_destroy = function(exp) {
				$(exp)
					.removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
					.removeData("resizable")
					.removeData("ui-resizable")
					.unbind(".resizable")
					.find(".ui-resizable-handle")
						.remove();
			};

		// TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			wrapper = this.element;
			this.originalElement.css({
				position: wrapper.css("position"),
				width: wrapper.outerWidth(),
				height: wrapper.outerHeight(),
				top: wrapper.css("top"),
				left: wrapper.css("left")
			}).insertAfter( wrapper );
			wrapper.remove();
		}

		this.originalElement.css("resize", this.originalResizeStyle);
		_destroy(this.originalElement);

		return this;
	},

	_mouseCapture: function(event) {
		var i, handle,
			capture = false;

		for (i in this.handles) {
			handle = $(this.handles[i])[0];
			if (handle === event.target || $.contains(handle, event.target)) {
				capture = true;
			}
		}

		return !this.options.disabled && capture;
	},

	_mouseStart: function(event) {

		var curleft, curtop, cursor,
			o = this.options,
			el = this.element;

		this.resizing = true;

		this._renderProxy();

		curleft = this._num(this.helper.css("left"));
		curtop = this._num(this.helper.css("top"));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		this.offset = this.helper.offset();
		this.position = { left: curleft, top: curtop };

		this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: el.width(),
				height: el.height()
			};

		this.originalSize = this._helper ? {
				width: el.outerWidth(),
				height: el.outerHeight()
			} : {
				width: el.width(),
				height: el.height()
			};

		this.sizeDiff = {
			width: el.outerWidth() - el.width(),
			height: el.outerHeight() - el.height()
		};

		this.originalPosition = { left: curleft, top: curtop };
		this.originalMousePosition = { left: event.pageX, top: event.pageY };

		this.aspectRatio = (typeof o.aspectRatio === "number") ?
			o.aspectRatio :
			((this.originalSize.width / this.originalSize.height) || 1);

		cursor = $(".ui-resizable-" + this.axis).css("cursor");
		$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

		el.addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function(event) {

		var data, props,
			smp = this.originalMousePosition,
			a = this.axis,
			dx = (event.pageX - smp.left) || 0,
			dy = (event.pageY - smp.top) || 0,
			trigger = this._change[a];

		this._updatePrevProperties();

		if (!trigger) {
			return false;
		}

		data = trigger.apply(this, [ event, dx, dy ]);

		this._updateVirtualBoundaries(event.shiftKey);
		if (this._aspectRatio || event.shiftKey) {
			data = this._updateRatio(data, event);
		}

		data = this._respectSize(data, event);

		this._updateCache(data);

		this._propagate("resize", event);

		props = this._applyChanges();

		if ( !this._helper && this._proportionallyResizeElements.length ) {
			this._proportionallyResize();
		}

		if ( !$.isEmptyObject( props ) ) {
			this._updatePrevProperties();
			this._trigger( "resize", event, this.ui() );
			this._applyChanges();
		}

		return false;
	},

	_mouseStop: function(event) {

		this.resizing = false;
		var pr, ista, soffseth, soffsetw, s, left, top,
			o = this.options, that = this;

		if (this._helper) {

			pr = this._proportionallyResizeElements;
			ista = pr.length && (/textarea/i).test(pr[0].nodeName);
			soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
			soffsetw = ista ? 0 : that.sizeDiff.width;

			s = {
				width: (that.helper.width()  - soffsetw),
				height: (that.helper.height() - soffseth)
			};
			left = (parseInt(that.element.css("left"), 10) +
				(that.position.left - that.originalPosition.left)) || null;
			top = (parseInt(that.element.css("top"), 10) +
				(that.position.top - that.originalPosition.top)) || null;

			if (!o.animate) {
				this.element.css($.extend(s, { top: top, left: left }));
			}

			that.helper.height(that.size.height);
			that.helper.width(that.size.width);

			if (this._helper && !o.animate) {
				this._proportionallyResize();
			}
		}

		$("body").css("cursor", "auto");

		this.element.removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) {
			this.helper.remove();
		}

		return false;

	},

	_updatePrevProperties: function() {
		this.prevPosition = {
			top: this.position.top,
			left: this.position.left
		};
		this.prevSize = {
			width: this.size.width,
			height: this.size.height
		};
	},

	_applyChanges: function() {
		var props = {};

		if ( this.position.top !== this.prevPosition.top ) {
			props.top = this.position.top + "px";
		}
		if ( this.position.left !== this.prevPosition.left ) {
			props.left = this.position.left + "px";
		}
		if ( this.size.width !== this.prevSize.width ) {
			props.width = this.size.width + "px";
		}
		if ( this.size.height !== this.prevSize.height ) {
			props.height = this.size.height + "px";
		}

		this.helper.css( props );

		return props;
	},

	_updateVirtualBoundaries: function(forceAspectRatio) {
		var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
			o = this.options;

		b = {
			minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
			maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
			minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
			maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
		};

		if (this._aspectRatio || forceAspectRatio) {
			pMinWidth = b.minHeight * this.aspectRatio;
			pMinHeight = b.minWidth / this.aspectRatio;
			pMaxWidth = b.maxHeight * this.aspectRatio;
			pMaxHeight = b.maxWidth / this.aspectRatio;

			if (pMinWidth > b.minWidth) {
				b.minWidth = pMinWidth;
			}
			if (pMinHeight > b.minHeight) {
				b.minHeight = pMinHeight;
			}
			if (pMaxWidth < b.maxWidth) {
				b.maxWidth = pMaxWidth;
			}
			if (pMaxHeight < b.maxHeight) {
				b.maxHeight = pMaxHeight;
			}
		}
		this._vBoundaries = b;
	},

	_updateCache: function(data) {
		this.offset = this.helper.offset();
		if (this._isNumber(data.left)) {
			this.position.left = data.left;
		}
		if (this._isNumber(data.top)) {
			this.position.top = data.top;
		}
		if (this._isNumber(data.height)) {
			this.size.height = data.height;
		}
		if (this._isNumber(data.width)) {
			this.size.width = data.width;
		}
	},

	_updateRatio: function( data ) {

		var cpos = this.position,
			csize = this.size,
			a = this.axis;

		if (this._isNumber(data.height)) {
			data.width = (data.height * this.aspectRatio);
		} else if (this._isNumber(data.width)) {
			data.height = (data.width / this.aspectRatio);
		}

		if (a === "sw") {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a === "nw") {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function( data ) {

		var o = this._vBoundaries,
			a = this.axis,
			ismaxw = this._isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width),
			ismaxh = this._isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
			isminw = this._isNumber(data.width) && o.minWidth && (o.minWidth > data.width),
			isminh = this._isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
			dw = this.originalPosition.left + this.originalSize.width,
			dh = this.position.top + this.size.height,
			cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
		if (isminw) {
			data.width = o.minWidth;
		}
		if (isminh) {
			data.height = o.minHeight;
		}
		if (ismaxw) {
			data.width = o.maxWidth;
		}
		if (ismaxh) {
			data.height = o.maxHeight;
		}

		if (isminw && cw) {
			data.left = dw - o.minWidth;
		}
		if (ismaxw && cw) {
			data.left = dw - o.maxWidth;
		}
		if (isminh && ch) {
			data.top = dh - o.minHeight;
		}
		if (ismaxh && ch) {
			data.top = dh - o.maxHeight;
		}

		// Fixing jump error on top/left - bug #2330
		if (!data.width && !data.height && !data.left && data.top) {
			data.top = null;
		} else if (!data.width && !data.height && !data.top && data.left) {
			data.left = null;
		}

		return data;
	},

	_getPaddingPlusBorderDimensions: function( element ) {
		var i = 0,
			widths = [],
			borders = [
				element.css( "borderTopWidth" ),
				element.css( "borderRightWidth" ),
				element.css( "borderBottomWidth" ),
				element.css( "borderLeftWidth" )
			],
			paddings = [
				element.css( "paddingTop" ),
				element.css( "paddingRight" ),
				element.css( "paddingBottom" ),
				element.css( "paddingLeft" )
			];

		for ( ; i < 4; i++ ) {
			widths[ i ] = ( parseInt( borders[ i ], 10 ) || 0 );
			widths[ i ] += ( parseInt( paddings[ i ], 10 ) || 0 );
		}

		return {
			height: widths[ 0 ] + widths[ 2 ],
			width: widths[ 1 ] + widths[ 3 ]
		};
	},

	_proportionallyResize: function() {

		if (!this._proportionallyResizeElements.length) {
			return;
		}

		var prel,
			i = 0,
			element = this.helper || this.element;

		for ( ; i < this._proportionallyResizeElements.length; i++) {

			prel = this._proportionallyResizeElements[i];

			// TODO: Seems like a bug to cache this.outerDimensions
			// considering that we are in a loop.
			if (!this.outerDimensions) {
				this.outerDimensions = this._getPaddingPlusBorderDimensions( prel );
			}

			prel.css({
				height: (element.height() - this.outerDimensions.height) || 0,
				width: (element.width() - this.outerDimensions.width) || 0
			});

		}

	},

	_renderProxy: function() {

		var el = this.element, o = this.options;
		this.elementOffset = el.offset();

		if (this._helper) {

			this.helper = this.helper || $("<div style='overflow:hidden;'></div>");

			this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper
				.appendTo("body")
				.disableSelection();

		} else {
			this.helper = this.element;
		}

	},

	_change: {
		e: function(event, dx) {
			return { width: this.originalSize.width + dx };
		},
		w: function(event, dx) {
			var cs = this.originalSize, sp = this.originalPosition;
			return { left: sp.left + dx, width: cs.width - dx };
		},
		n: function(event, dx, dy) {
			var cs = this.originalSize, sp = this.originalPosition;
			return { top: sp.top + dy, height: cs.height - dy };
		},
		s: function(event, dx, dy) {
			return { height: this.originalSize.height + dy };
		},
		se: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments),
				this._change.e.apply(this, [ event, dx, dy ]));
		},
		sw: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments),
				this._change.w.apply(this, [ event, dx, dy ]));
		},
		ne: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments),
				this._change.e.apply(this, [ event, dx, dy ]));
		},
		nw: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments),
				this._change.w.apply(this, [ event, dx, dy ]));
		}
	},

	_propagate: function(n, event) {
		$.ui.plugin.call(this, n, [ event, this.ui() ]);
		(n !== "resize" && this._trigger(n, event, this.ui()));
	},

	plugins: {},

	ui: function() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

});

/*
 * Resizable Extensions
 */

$.ui.plugin.add("resizable", "animate", {

	stop: function( event ) {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			pr = that._proportionallyResizeElements,
			ista = pr.length && (/textarea/i).test(pr[0].nodeName),
			soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
			soffsetw = ista ? 0 : that.sizeDiff.width,
			style = { width: (that.size.width - soffsetw), height: (that.size.height - soffseth) },
			left = (parseInt(that.element.css("left"), 10) +
				(that.position.left - that.originalPosition.left)) || null,
			top = (parseInt(that.element.css("top"), 10) +
				(that.position.top - that.originalPosition.top)) || null;

		that.element.animate(
			$.extend(style, top && left ? { top: top, left: left } : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {

					var data = {
						width: parseInt(that.element.css("width"), 10),
						height: parseInt(that.element.css("height"), 10),
						top: parseInt(that.element.css("top"), 10),
						left: parseInt(that.element.css("left"), 10)
					};

					if (pr && pr.length) {
						$(pr[0]).css({ width: data.width, height: data.height });
					}

					// propagating resize, and updating values for each animation step
					that._updateCache(data);
					that._propagate("resize", event);

				}
			}
		);
	}

});

$.ui.plugin.add( "resizable", "containment", {

	start: function() {
		var element, p, co, ch, cw, width, height,
			that = $( this ).resizable( "instance" ),
			o = that.options,
			el = that.element,
			oc = o.containment,
			ce = ( oc instanceof $ ) ? oc.get( 0 ) : ( /parent/.test( oc ) ) ? el.parent().get( 0 ) : oc;

		if ( !ce ) {
			return;
		}

		that.containerElement = $( ce );

		if ( /document/.test( oc ) || oc === document ) {
			that.containerOffset = {
				left: 0,
				top: 0
			};
			that.containerPosition = {
				left: 0,
				top: 0
			};

			that.parentData = {
				element: $( document ),
				left: 0,
				top: 0,
				width: $( document ).width(),
				height: $( document ).height() || document.body.parentNode.scrollHeight
			};
		} else {
			element = $( ce );
			p = [];
			$([ "Top", "Right", "Left", "Bottom" ]).each(function( i, name ) {
				p[ i ] = that._num( element.css( "padding" + name ) );
			});

			that.containerOffset = element.offset();
			that.containerPosition = element.position();
			that.containerSize = {
				height: ( element.innerHeight() - p[ 3 ] ),
				width: ( element.innerWidth() - p[ 1 ] )
			};

			co = that.containerOffset;
			ch = that.containerSize.height;
			cw = that.containerSize.width;
			width = ( that._hasScroll ( ce, "left" ) ? ce.scrollWidth : cw );
			height = ( that._hasScroll ( ce ) ? ce.scrollHeight : ch ) ;

			that.parentData = {
				element: ce,
				left: co.left,
				top: co.top,
				width: width,
				height: height
			};
		}
	},

	resize: function( event ) {
		var woset, hoset, isParent, isOffsetRelative,
			that = $( this ).resizable( "instance" ),
			o = that.options,
			co = that.containerOffset,
			cp = that.position,
			pRatio = that._aspectRatio || event.shiftKey,
			cop = {
				top: 0,
				left: 0
			},
			ce = that.containerElement,
			continueResize = true;

		if ( ce[ 0 ] !== document && ( /static/ ).test( ce.css( "position" ) ) ) {
			cop = co;
		}

		if ( cp.left < ( that._helper ? co.left : 0 ) ) {
			that.size.width = that.size.width +
				( that._helper ?
					( that.position.left - co.left ) :
					( that.position.left - cop.left ) );

			if ( pRatio ) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
			that.position.left = o.helper ? co.left : 0;
		}

		if ( cp.top < ( that._helper ? co.top : 0 ) ) {
			that.size.height = that.size.height +
				( that._helper ?
					( that.position.top - co.top ) :
					that.position.top );

			if ( pRatio ) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
			that.position.top = that._helper ? co.top : 0;
		}

		isParent = that.containerElement.get( 0 ) === that.element.parent().get( 0 );
		isOffsetRelative = /relative|absolute/.test( that.containerElement.css( "position" ) );

		if ( isParent && isOffsetRelative ) {
			that.offset.left = that.parentData.left + that.position.left;
			that.offset.top = that.parentData.top + that.position.top;
		} else {
			that.offset.left = that.element.offset().left;
			that.offset.top = that.element.offset().top;
		}

		woset = Math.abs( that.sizeDiff.width +
			(that._helper ?
				that.offset.left - cop.left :
				(that.offset.left - co.left)) );

		hoset = Math.abs( that.sizeDiff.height +
			(that._helper ?
				that.offset.top - cop.top :
				(that.offset.top - co.top)) );

		if ( woset + that.size.width >= that.parentData.width ) {
			that.size.width = that.parentData.width - woset;
			if ( pRatio ) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
		}

		if ( hoset + that.size.height >= that.parentData.height ) {
			that.size.height = that.parentData.height - hoset;
			if ( pRatio ) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
		}

		if ( !continueResize ) {
			that.position.left = that.prevPosition.left;
			that.position.top = that.prevPosition.top;
			that.size.width = that.prevSize.width;
			that.size.height = that.prevSize.height;
		}
	},

	stop: function() {
		var that = $( this ).resizable( "instance" ),
			o = that.options,
			co = that.containerOffset,
			cop = that.containerPosition,
			ce = that.containerElement,
			helper = $( that.helper ),
			ho = helper.offset(),
			w = helper.outerWidth() - that.sizeDiff.width,
			h = helper.outerHeight() - that.sizeDiff.height;

		if ( that._helper && !o.animate && ( /relative/ ).test( ce.css( "position" ) ) ) {
			$( this ).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}

		if ( that._helper && !o.animate && ( /static/ ).test( ce.css( "position" ) ) ) {
			$( this ).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}
	}
});

$.ui.plugin.add("resizable", "alsoResize", {

	start: function() {
		var that = $(this).resizable( "instance" ),
			o = that.options;

		$(o.alsoResize).each(function() {
			var el = $(this);
			el.data("ui-resizable-alsoresize", {
				width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
				left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
			});
		});
	},

	resize: function(event, ui) {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			os = that.originalSize,
			op = that.originalPosition,
			delta = {
				height: (that.size.height - os.height) || 0,
				width: (that.size.width - os.width) || 0,
				top: (that.position.top - op.top) || 0,
				left: (that.position.left - op.left) || 0
			};

			$(o.alsoResize).each(function() {
				var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {},
					css = el.parents(ui.originalElement[0]).length ?
							[ "width", "height" ] :
							[ "width", "height", "top", "left" ];

				$.each(css, function(i, prop) {
					var sum = (start[prop] || 0) + (delta[prop] || 0);
					if (sum && sum >= 0) {
						style[prop] = sum || null;
					}
				});

				el.css(style);
			});
	},

	stop: function() {
		$(this).removeData("resizable-alsoresize");
	}
});

$.ui.plugin.add("resizable", "ghost", {

	start: function() {

		var that = $(this).resizable( "instance" ), o = that.options, cs = that.size;

		that.ghost = that.originalElement.clone();
		that.ghost
			.css({
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: cs.height,
				width: cs.width,
				margin: 0,
				left: 0,
				top: 0
			})
			.addClass("ui-resizable-ghost")
			.addClass(typeof o.ghost === "string" ? o.ghost : "");

		that.ghost.appendTo(that.helper);

	},

	resize: function() {
		var that = $(this).resizable( "instance" );
		if (that.ghost) {
			that.ghost.css({
				position: "relative",
				height: that.size.height,
				width: that.size.width
			});
		}
	},

	stop: function() {
		var that = $(this).resizable( "instance" );
		if (that.ghost && that.helper) {
			that.helper.get(0).removeChild(that.ghost.get(0));
		}
	}

});

$.ui.plugin.add("resizable", "grid", {

	resize: function() {
		var outerDimensions,
			that = $(this).resizable( "instance" ),
			o = that.options,
			cs = that.size,
			os = that.originalSize,
			op = that.originalPosition,
			a = that.axis,
			grid = typeof o.grid === "number" ? [ o.grid, o.grid ] : o.grid,
			gridX = (grid[0] || 1),
			gridY = (grid[1] || 1),
			ox = Math.round((cs.width - os.width) / gridX) * gridX,
			oy = Math.round((cs.height - os.height) / gridY) * gridY,
			newWidth = os.width + ox,
			newHeight = os.height + oy,
			isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
			isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
			isMinWidth = o.minWidth && (o.minWidth > newWidth),
			isMinHeight = o.minHeight && (o.minHeight > newHeight);

		o.grid = grid;

		if (isMinWidth) {
			newWidth += gridX;
		}
		if (isMinHeight) {
			newHeight += gridY;
		}
		if (isMaxWidth) {
			newWidth -= gridX;
		}
		if (isMaxHeight) {
			newHeight -= gridY;
		}

		if (/^(se|s|e)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
		} else if (/^(ne)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.top = op.top - oy;
		} else if (/^(sw)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.left = op.left - ox;
		} else {
			if ( newHeight - gridY <= 0 || newWidth - gridX <= 0) {
				outerDimensions = that._getPaddingPlusBorderDimensions( this );
			}

			if ( newHeight - gridY > 0 ) {
				that.size.height = newHeight;
				that.position.top = op.top - oy;
			} else {
				newHeight = gridY - outerDimensions.height;
				that.size.height = newHeight;
				that.position.top = op.top + os.height - newHeight;
			}
			if ( newWidth - gridX > 0 ) {
				that.size.width = newWidth;
				that.position.left = op.left - ox;
			} else {
				newWidth = gridX - outerDimensions.width;
				that.size.width = newWidth;
				that.position.left = op.left + os.width - newWidth;
			}
		}
	}

});

var resizable = $.ui.resizable;


/*!
 * jQuery UI Selectable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectable/
 */


var selectable = $.widget("ui.selectable", $.ui.mouse, {
	version: "1.11.4",
	options: {
		appendTo: "body",
		autoRefresh: true,
		distance: 0,
		filter: "*",
		tolerance: "touch",

		// callbacks
		selected: null,
		selecting: null,
		start: null,
		stop: null,
		unselected: null,
		unselecting: null
	},
	_create: function() {
		var selectees,
			that = this;

		this.element.addClass("ui-selectable");

		this.dragged = false;

		// cache selectee children based on filter
		this.refresh = function() {
			selectees = $(that.options.filter, that.element[0]);
			selectees.addClass("ui-selectee");
			selectees.each(function() {
				var $this = $(this),
					pos = $this.offset();
				$.data(this, "selectable-item", {
					element: this,
					$element: $this,
					left: pos.left,
					top: pos.top,
					right: pos.left + $this.outerWidth(),
					bottom: pos.top + $this.outerHeight(),
					startselected: false,
					selected: $this.hasClass("ui-selected"),
					selecting: $this.hasClass("ui-selecting"),
					unselecting: $this.hasClass("ui-unselecting")
				});
			});
		};
		this.refresh();

		this.selectees = selectees.addClass("ui-selectee");

		this._mouseInit();

		this.helper = $("<div class='ui-selectable-helper'></div>");
	},

	_destroy: function() {
		this.selectees
			.removeClass("ui-selectee")
			.removeData("selectable-item");
		this.element
			.removeClass("ui-selectable ui-selectable-disabled");
		this._mouseDestroy();
	},

	_mouseStart: function(event) {
		var that = this,
			options = this.options;

		this.opos = [ event.pageX, event.pageY ];

		if (this.options.disabled) {
			return;
		}

		this.selectees = $(options.filter, this.element[0]);

		this._trigger("start", event);

		$(options.appendTo).append(this.helper);
		// position helper (lasso)
		this.helper.css({
			"left": event.pageX,
			"top": event.pageY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter(".ui-selected").each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
			if (!event.metaKey && !event.ctrlKey) {
				selectee.$element.removeClass("ui-selected");
				selectee.selected = false;
				selectee.$element.addClass("ui-unselecting");
				selectee.unselecting = true;
				// selectable UNSELECTING callback
				that._trigger("unselecting", event, {
					unselecting: selectee.element
				});
			}
		});

		$(event.target).parents().addBack().each(function() {
			var doSelect,
				selectee = $.data(this, "selectable-item");
			if (selectee) {
				doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
				selectee.$element
					.removeClass(doSelect ? "ui-unselecting" : "ui-selected")
					.addClass(doSelect ? "ui-selecting" : "ui-unselecting");
				selectee.unselecting = !doSelect;
				selectee.selecting = doSelect;
				selectee.selected = doSelect;
				// selectable (UN)SELECTING callback
				if (doSelect) {
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				} else {
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
				return false;
			}
		});

	},

	_mouseDrag: function(event) {

		this.dragged = true;

		if (this.options.disabled) {
			return;
		}

		var tmp,
			that = this,
			options = this.options,
			x1 = this.opos[0],
			y1 = this.opos[1],
			x2 = event.pageX,
			y2 = event.pageY;

		if (x1 > x2) { tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { tmp = y2; y2 = y1; y1 = tmp; }
		this.helper.css({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });

		this.selectees.each(function() {
			var selectee = $.data(this, "selectable-item"),
				hit = false;

			//prevent helper from being selected if appendTo: selectable
			if (!selectee || selectee.element === that.element[0]) {
				return;
			}

			if (options.tolerance === "touch") {
				hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
			} else if (options.tolerance === "fit") {
				hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
			}

			if (hit) {
				// SELECT
				if (selectee.selected) {
					selectee.$element.removeClass("ui-selected");
					selectee.selected = false;
				}
				if (selectee.unselecting) {
					selectee.$element.removeClass("ui-unselecting");
					selectee.unselecting = false;
				}
				if (!selectee.selecting) {
					selectee.$element.addClass("ui-selecting");
					selectee.selecting = true;
					// selectable SELECTING callback
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				}
			} else {
				// UNSELECT
				if (selectee.selecting) {
					if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
						selectee.$element.removeClass("ui-selecting");
						selectee.selecting = false;
						selectee.$element.addClass("ui-selected");
						selectee.selected = true;
					} else {
						selectee.$element.removeClass("ui-selecting");
						selectee.selecting = false;
						if (selectee.startselected) {
							selectee.$element.addClass("ui-unselecting");
							selectee.unselecting = true;
						}
						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
				if (selectee.selected) {
					if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
						selectee.$element.removeClass("ui-selected");
						selectee.selected = false;

						selectee.$element.addClass("ui-unselecting");
						selectee.unselecting = true;
						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
			}
		});

		return false;
	},

	_mouseStop: function(event) {
		var that = this;

		this.dragged = false;

		$(".ui-unselecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-unselecting");
			selectee.unselecting = false;
			selectee.startselected = false;
			that._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
		$(".ui-selecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
			selectee.selecting = false;
			selectee.selected = true;
			selectee.startselected = true;
			that._trigger("selected", event, {
				selected: selectee.element
			});
		});
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

});


/*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */


var sortable = $.widget("ui.sortable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: "> *",
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000,

		// callbacks
		activate: null,
		beforeStop: null,
		change: null,
		deactivate: null,
		out: null,
		over: null,
		receive: null,
		remove: null,
		sort: null,
		start: null,
		stop: null,
		update: null
	},

	_isOverAxis: function( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	},

	_isFloating: function( item ) {
		return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
	},

	_create: function() {
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		this._setHandleClassName();

		//We're ready to go
		this.ready = true;

	},

	_setOption: function( key, value ) {
		this._super( key, value );

		if ( key === "handle" ) {
			this._setHandleClassName();
		}
	},

	_setHandleClassName: function() {
		this.element.find( ".ui-sortable-handle" ).removeClass( "ui-sortable-handle" );
		$.each( this.items, function() {
			( this.instance.options.handle ?
				this.item.find( this.instance.options.handle ) : this.item )
				.addClass( "ui-sortable-handle" );
		});
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-sortable ui-sortable-disabled" )
			.find( ".ui-sortable-handle" )
				.removeClass( "ui-sortable-handle" );
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- ) {
			this.items[i].item.removeData(this.widgetName + "-item");
		}

		return this;
	},

	_mouseCapture: function(event, overrideHandle) {
		var currentItem = null,
			validHandle = false,
			that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type === "static") {
			return false;
		}

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		$(event.target).parents().each(function() {
			if($.data(this, that.widgetName + "-item") === that) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + "-item") === that) {
			currentItem = $(event.target);
		}

		if(!currentItem) {
			return false;
		}
		if(this.options.handle && !overrideHandle) {
			$(this.options.handle, currentItem).find("*").addBack().each(function() {
				if(this === event.target) {
					validHandle = true;
				}
			});
			if(!validHandle) {
				return false;
			}
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var i, body,
			o = this.options;

		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] !== this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment) {
			this._setContainment();
		}

		if( o.cursor && o.cursor !== "auto" ) { // cursor option
			body = this.document.find( "body" );

			// support: IE
			this.storedCursor = body.css( "cursor" );
			body.css( "cursor", o.cursor );

			this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) {
				this._storedOpacity = this.helper.css("opacity");
			}
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) {
				this._storedZIndex = this.helper.css("zIndex");
			}
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
			this.overflowOffset = this.scrollParent.offset();
		}

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions) {
			this._cacheHelperProportions();
		}


		//Post "activate" events to possible containers
		if( !noActivation ) {
			for ( i = this.containers.length - 1; i >= 0; i-- ) {
				this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
			}
		}

		//Prepare possible droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {
		var i, item, itemElement, intersection,
			o = this.options,
			scrolled = false;

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			if(this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
				}

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
				}

			} else {

				if(event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
					scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
				} else if(this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
					scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
				}

				if(event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
					scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
				} else if(this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
					scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
				}

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis !== "y") {
			this.helper[0].style.left = this.position.left+"px";
		}
		if(!this.options.axis || this.options.axis !== "x") {
			this.helper[0].style.top = this.position.top+"px";
		}

		//Rearrange
		for (i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			item = this.items[i];
			itemElement = item.item[0];
			intersection = this._intersectsWithPointer(item);
			if (!intersection) {
				continue;
			}

			// Only put the placeholder inside the current Container, skip all
			// items from other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this, moving items in "sub-sortables" can cause
			// the placeholder to jitter between the outer and inner container.
			if (item.instance !== this.currentContainer) {
				continue;
			}

			// cannot intersect with itself
			// no useless actions that have been done before
			// no action if the item moved is the parent of the item checked
			if (itemElement !== this.currentItem[0] &&
				this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
				!$.contains(this.placeholder[0], itemElement) &&
				(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
			) {

				this.direction = intersection === 1 ? "down" : "up";

				if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		//Call callbacks
		this._trigger("sort", event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) {
			return;
		}

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			$.ui.ddmanager.drop(this, event);
		}

		if(this.options.revert) {
			var that = this,
				cur = this.placeholder.offset(),
				axis = this.options.axis,
				animation = {};

			if ( !axis || axis === "x" ) {
				animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
			}
			if ( !axis || axis === "y" ) {
				animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
			}
			this.reverting = true;
			$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper === "original") {
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			if(this.placeholder[0].parentNode) {
				this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			}
			if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
				this.helper.remove();
			}

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			str = [];
		o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
			if (res) {
				str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));
			}
		});

		if(!str.length && o.key) {
			str.push(o.key + "=");
		}

		return str.join("&");

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			ret = [];

		o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height,
			l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height,
			dyClick = this.offset.click.top,
			dxClick = this.offset.click.left,
			isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),
			isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),
			isOverElement = isOverElementHeight && isOverElementWidth;

		if ( this.options.tolerance === "pointer" ||
			this.options.forcePointerForContainers ||
			(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) && // Right Half
				x2 - (this.helperProportions.width / 2) < r && // Left Half
				t < y1 + (this.helperProportions.height / 2) && // Bottom Half
				y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement) {
			return false;
		}

		return this.floating ?
			( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta !== 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta !== 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this._setHandleClassName();
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var i, j, cur, inst,
			items = [],
			queries = [],
			connectWith = this._connectWith();

		if(connectWith && connected) {
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i], this.document[0]);
				for ( j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
					}
				}
			}
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

		function addItems() {
			items.push( this );
		}
		for (i = queries.length - 1; i >= 0; i--){
			queries[i][0].each( addItems );
		}

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j=0; j < list.length; j++) {
				if(list[j] === item.item[0]) {
					return false;
				}
			}
			return true;
		});

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];

		var i, j, cur, inst, targetData, _queries, item, queriesLength,
			items = this.items,
			queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
			connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i], this.document[0]);
				for (j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				}
			}
		}

		for (i = queries.length - 1; i >= 0; i--) {
			targetData = queries[i][1];
			_queries = queries[i][0];

			for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				item = $(_queries[j]);

				item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			}
		}

	},

	refreshPositions: function(fast) {

		// Determine whether items are being displayed horizontally
		this.floating = this.items.length ?
			this.options.axis === "x" || this._isFloating( this.items[ 0 ].item ) :
			false;

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		var i, item, t, p;

		for (i = this.items.length - 1; i >= 0; i--){
			item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
				continue;
			}

			t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			p = t.offset();
			item.left = p.left;
			item.top = p.top;
		}

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (i = this.containers.length - 1; i >= 0; i--){
				p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			}
		}

		return this;
	},

	_createPlaceholder: function(that) {
		that = that || this;
		var className,
			o = that.options;

		if(!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function() {

					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						element = $( "<" + nodeName + ">", that.document[0] )
							.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
							.removeClass("ui-sortable-helper");

					if ( nodeName === "tbody" ) {
						that._createTrPlaceholder(
							that.currentItem.find( "tr" ).eq( 0 ),
							$( "<tr>", that.document[ 0 ] ).appendTo( element )
						);
					} else if ( nodeName === "tr" ) {
						that._createTrPlaceholder( that.currentItem, element );
					} else if ( nodeName === "img" ) {
						element.attr( "src", that.currentItem.attr( "src" ) );
					}

					if ( !className ) {
						element.css( "visibility", "hidden" );
					}

					return element;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);

	},

	_createTrPlaceholder: function( sourceTr, targetTr ) {
		var that = this;

		sourceTr.children().each(function() {
			$( "<td>&#160;</td>", that.document[ 0 ] )
				.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
				.appendTo( targetTr );
		});
	},

	_contactContainers: function(event) {
		var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis,
			innermostContainer = null,
			innermostIndex = null;

		// get innermost container that intersects with item
		for (i = this.containers.length - 1; i >= 0; i--) {

			// never consider a container that's located within the item itself
			if($.contains(this.currentItem[0], this.containers[i].element[0])) {
				continue;
			}

			if(this._intersectsWith(this.containers[i].containerCache)) {

				// if we've already found a container and it's more "inner" than this, then continue
				if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
					continue;
				}

				innermostContainer = this.containers[i];
				innermostIndex = i;

			} else {
				// container doesn't intersect. trigger "out" event if necessary
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		// if no intersecting containers found, return
		if(!innermostContainer) {
			return;
		}

		// move the item into the container if it's not there already
		if(this.containers.length === 1) {
			if (!this.containers[innermostIndex].containerCache.over) {
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		} else {

			//When entering a new container, we will find the item with the least distance and append our item near it
			dist = 10000;
			itemWithLeastDistance = null;
			floating = innermostContainer.floating || this._isFloating(this.currentItem);
			posProperty = floating ? "left" : "top";
			sizeProperty = floating ? "width" : "height";
			axis = floating ? "clientX" : "clientY";

			for (j = this.items.length - 1; j >= 0; j--) {
				if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
					continue;
				}
				if(this.items[j].item[0] === this.currentItem[0]) {
					continue;
				}

				cur = this.items[j].item.offset()[posProperty];
				nearBottom = false;
				if ( event[ axis ] - cur > this.items[ j ][ sizeProperty ] / 2 ) {
					nearBottom = true;
				}

				if ( Math.abs( event[ axis ] - cur ) < dist ) {
					dist = Math.abs( event[ axis ] - cur );
					itemWithLeastDistance = this.items[ j ];
					this.direction = nearBottom ? "up": "down";
				}
			}

			//Check if dropOnEmpty is enabled
			if(!itemWithLeastDistance && !this.options.dropOnEmpty) {
				return;
			}

			if(this.currentContainer === this.containers[innermostIndex]) {
				if ( !this.currentContainer.containerCache.over ) {
					this.containers[ innermostIndex ]._trigger( "over", event, this._uiHash() );
					this.currentContainer.containerCache.over = 1;
				}
				return;
			}

			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
			this.currentContainer = this.containers[innermostIndex];

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}


	},

	_createHelper: function(event) {

		var o = this.options,
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);

		//Add the helper to the DOM if that didn't happen already
		if(!helper.parents("body").length) {
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
		}

		if(helper[0] === this.currentItem[0]) {
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
		}

		if(!helper[0].style.width || o.forceHelperSize) {
			helper.width(this.currentItem.width());
		}
		if(!helper[0].style.height || o.forceHelperSize) {
			helper.height(this.currentItem.height());
		}

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		// This needs to be actually done for all browsers, since pageX/pageY includes this information
		// with an ugly IE fix
		if( this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition === "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var ce, co, over,
			o = this.options;
		if(o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}
		if(o.containment === "document" || o.containment === "window") {
			this.containment = [
				0 - this.offset.relative.left - this.offset.parent.left,
				0 - this.offset.relative.top - this.offset.parent.top,
				o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left,
				(o.containment === "document" ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
			];
		}

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			ce = $(o.containment)[0];
			co = $(o.containment).offset();
			over = ($(ce).css("overflow") !== "hidden");

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) {
			pos = this.position;
		}
		var mod = d === "absolute" ? 1 : -1,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var top, left,
			o = this.options,
			pageX = event.pageX,
			pageY = event.pageY,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) {
					pageX = this.containment[0] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top < this.containment[1]) {
					pageY = this.containment[1] + this.offset.click.top;
				}
				if(event.pageX - this.offset.click.left > this.containment[2]) {
					pageX = this.containment[2] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top > this.containment[3]) {
					pageY = this.containment[3] + this.offset.click.top;
				}
			}

			if(o.grid) {
				top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY -																// The absolute mouse position
				this.offset.click.top -													// Click offset (relative to the element)
				this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX -																// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function() {
			if(counter === this.counter) {
				this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
			}
		});

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var i,
			delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem.parent().length) {
			this.placeholder.before(this.currentItem);
		}
		this._noFinalSort = null;

		if(this.helper[0] === this.currentItem[0]) {
			for(i in this._storedCSS) {
				if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
					this._storedCSS[i] = "";
				}
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		}
		if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		}

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if(!noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
				delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
				delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
			}
		}


		//Post events to containers
		function delayEvent( type, instance, container ) {
			return function( event ) {
				container._trigger( type, event, instance._uiHash( instance ) );
			};
		}
		for (i = this.containers.length - 1; i >= 0; i--){
			if (!noPropagation) {
				delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
			}
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if ( this.storedCursor ) {
			this.document.find( "body" ).css( "cursor", this.storedCursor );
			this.storedStylesheet.remove();
		}
		if(this._storedOpacity) {
			this.helper.css("opacity", this._storedOpacity);
		}
		if(this._storedZIndex) {
			this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
		}

		this.dragging = false;

		if(!noPropagation) {
			this._trigger("beforeStop", event, this._uiHash());
		}

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if ( !this.cancelHelperRemoval ) {
			if ( this.helper[ 0 ] !== this.currentItem[ 0 ] ) {
				this.helper.remove();
			}
			this.helper = null;
		}

		if(!noPropagation) {
			for (i=0; i < delayedTriggers.length; i++) {
				delayedTriggers[i].call(this, event);
			} //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return !this.cancelHelperRemoval;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(_inst) {
		var inst = _inst || this;
		return {
			helper: inst.helper,
			placeholder: inst.placeholder || $([]),
			position: inst.position,
			originalPosition: inst.originalPosition,
			offset: inst.positionAbs,
			item: inst.currentItem,
			sender: _inst ? _inst.element : null
		};
	}

});


/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */


var accordion = $.widget( "ui.accordion", {
	version: "1.11.4",
	options: {
		active: 0,
		animate: {},
		collapsible: false,
		event: "click",
		header: "> li > :first-child,> :not(li):even",
		heightStyle: "auto",
		icons: {
			activeHeader: "ui-icon-triangle-1-s",
			header: "ui-icon-triangle-1-e"
		},

		// callbacks
		activate: null,
		beforeActivate: null
	},

	hideProps: {
		borderTopWidth: "hide",
		borderBottomWidth: "hide",
		paddingTop: "hide",
		paddingBottom: "hide",
		height: "hide"
	},

	showProps: {
		borderTopWidth: "show",
		borderBottomWidth: "show",
		paddingTop: "show",
		paddingBottom: "show",
		height: "show"
	},

	_create: function() {
		var options = this.options;
		this.prevShow = this.prevHide = $();
		this.element.addClass( "ui-accordion ui-widget ui-helper-reset" )
			// ARIA
			.attr( "role", "tablist" );

		// don't allow collapsible: false and active: false / null
		if ( !options.collapsible && (options.active === false || options.active == null) ) {
			options.active = 0;
		}

		this._processPanels();
		// handle negative values
		if ( options.active < 0 ) {
			options.active += this.headers.length;
		}
		this._refresh();
	},

	_getCreateEventData: function() {
		return {
			header: this.active,
			panel: !this.active.length ? $() : this.active.next()
		};
	},

	_createIcons: function() {
		var icons = this.options.icons;
		if ( icons ) {
			$( "<span>" )
				.addClass( "ui-accordion-header-icon ui-icon " + icons.header )
				.prependTo( this.headers );
			this.active.children( ".ui-accordion-header-icon" )
				.removeClass( icons.header )
				.addClass( icons.activeHeader );
			this.headers.addClass( "ui-accordion-icons" );
		}
	},

	_destroyIcons: function() {
		this.headers
			.removeClass( "ui-accordion-icons" )
			.children( ".ui-accordion-header-icon" )
				.remove();
	},

	_destroy: function() {
		var contents;

		// clean up main element
		this.element
			.removeClass( "ui-accordion ui-widget ui-helper-reset" )
			.removeAttr( "role" );

		// clean up headers
		this.headers
			.removeClass( "ui-accordion-header ui-accordion-header-active ui-state-default " +
				"ui-corner-all ui-state-active ui-state-disabled ui-corner-top" )
			.removeAttr( "role" )
			.removeAttr( "aria-expanded" )
			.removeAttr( "aria-selected" )
			.removeAttr( "aria-controls" )
			.removeAttr( "tabIndex" )
			.removeUniqueId();

		this._destroyIcons();

		// clean up content panels
		contents = this.headers.next()
			.removeClass( "ui-helper-reset ui-widget-content ui-corner-bottom " +
				"ui-accordion-content ui-accordion-content-active ui-state-disabled" )
			.css( "display", "" )
			.removeAttr( "role" )
			.removeAttr( "aria-hidden" )
			.removeAttr( "aria-labelledby" )
			.removeUniqueId();

		if ( this.options.heightStyle !== "content" ) {
			contents.css( "height", "" );
		}
	},

	_setOption: function( key, value ) {
		if ( key === "active" ) {
			// _activate() will handle invalid values and update this.options
			this._activate( value );
			return;
		}

		if ( key === "event" ) {
			if ( this.options.event ) {
				this._off( this.headers, this.options.event );
			}
			this._setupEvents( value );
		}

		this._super( key, value );

		// setting collapsible: false while collapsed; open first panel
		if ( key === "collapsible" && !value && this.options.active === false ) {
			this._activate( 0 );
		}

		if ( key === "icons" ) {
			this._destroyIcons();
			if ( value ) {
				this._createIcons();
			}
		}

		// #5332 - opacity doesn't cascade to positioned elements in IE
		// so we need to add the disabled class to the headers and panels
		if ( key === "disabled" ) {
			this.element
				.toggleClass( "ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.headers.add( this.headers.next() )
				.toggleClass( "ui-state-disabled", !!value );
		}
	},

	_keydown: function( event ) {
		if ( event.altKey || event.ctrlKey ) {
			return;
		}

		var keyCode = $.ui.keyCode,
			length = this.headers.length,
			currentIndex = this.headers.index( event.target ),
			toFocus = false;

		switch ( event.keyCode ) {
			case keyCode.RIGHT:
			case keyCode.DOWN:
				toFocus = this.headers[ ( currentIndex + 1 ) % length ];
				break;
			case keyCode.LEFT:
			case keyCode.UP:
				toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];
				break;
			case keyCode.SPACE:
			case keyCode.ENTER:
				this._eventHandler( event );
				break;
			case keyCode.HOME:
				toFocus = this.headers[ 0 ];
				break;
			case keyCode.END:
				toFocus = this.headers[ length - 1 ];
				break;
		}

		if ( toFocus ) {
			$( event.target ).attr( "tabIndex", -1 );
			$( toFocus ).attr( "tabIndex", 0 );
			toFocus.focus();
			event.preventDefault();
		}
	},

	_panelKeyDown: function( event ) {
		if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
			$( event.currentTarget ).prev().focus();
		}
	},

	refresh: function() {
		var options = this.options;
		this._processPanels();

		// was collapsed or no panel
		if ( ( options.active === false && options.collapsible === true ) || !this.headers.length ) {
			options.active = false;
			this.active = $();
		// active false only when collapsible is true
		} else if ( options.active === false ) {
			this._activate( 0 );
		// was active, but active panel is gone
		} else if ( this.active.length && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
			// all remaining panel are disabled
			if ( this.headers.length === this.headers.find(".ui-state-disabled").length ) {
				options.active = false;
				this.active = $();
			// activate previous panel
			} else {
				this._activate( Math.max( 0, options.active - 1 ) );
			}
		// was active, active panel still exists
		} else {
			// make sure active index is correct
			options.active = this.headers.index( this.active );
		}

		this._destroyIcons();

		this._refresh();
	},

	_processPanels: function() {
		var prevHeaders = this.headers,
			prevPanels = this.panels;

		this.headers = this.element.find( this.options.header )
			.addClass( "ui-accordion-header ui-state-default ui-corner-all" );

		this.panels = this.headers.next()
			.addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" )
			.filter( ":not(.ui-accordion-content-active)" )
			.hide();

		// Avoid memory leaks (#10056)
		if ( prevPanels ) {
			this._off( prevHeaders.not( this.headers ) );
			this._off( prevPanels.not( this.panels ) );
		}
	},

	_refresh: function() {
		var maxHeight,
			options = this.options,
			heightStyle = options.heightStyle,
			parent = this.element.parent();

		this.active = this._findActive( options.active )
			.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" )
			.removeClass( "ui-corner-all" );
		this.active.next()
			.addClass( "ui-accordion-content-active" )
			.show();

		this.headers
			.attr( "role", "tab" )
			.each(function() {
				var header = $( this ),
					headerId = header.uniqueId().attr( "id" ),
					panel = header.next(),
					panelId = panel.uniqueId().attr( "id" );
				header.attr( "aria-controls", panelId );
				panel.attr( "aria-labelledby", headerId );
			})
			.next()
				.attr( "role", "tabpanel" );

		this.headers
			.not( this.active )
			.attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			})
			.next()
				.attr({
					"aria-hidden": "true"
				})
				.hide();

		// make sure at least one header is in the tab order
		if ( !this.active.length ) {
			this.headers.eq( 0 ).attr( "tabIndex", 0 );
		} else {
			this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
			.next()
				.attr({
					"aria-hidden": "false"
				});
		}

		this._createIcons();

		this._setupEvents( options.event );

		if ( heightStyle === "fill" ) {
			maxHeight = parent.height();
			this.element.siblings( ":visible" ).each(function() {
				var elem = $( this ),
					position = elem.css( "position" );

				if ( position === "absolute" || position === "fixed" ) {
					return;
				}
				maxHeight -= elem.outerHeight( true );
			});

			this.headers.each(function() {
				maxHeight -= $( this ).outerHeight( true );
			});

			this.headers.next()
				.each(function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				})
				.css( "overflow", "auto" );
		} else if ( heightStyle === "auto" ) {
			maxHeight = 0;
			this.headers.next()
				.each(function() {
					maxHeight = Math.max( maxHeight, $( this ).css( "height", "" ).height() );
				})
				.height( maxHeight );
		}
	},

	_activate: function( index ) {
		var active = this._findActive( index )[ 0 ];

		// trying to activate the already active panel
		if ( active === this.active[ 0 ] ) {
			return;
		}

		// trying to collapse, simulate a click on the currently active header
		active = active || this.active[ 0 ];

		this._eventHandler({
			target: active,
			currentTarget: active,
			preventDefault: $.noop
		});
	},

	_findActive: function( selector ) {
		return typeof selector === "number" ? this.headers.eq( selector ) : $();
	},

	_setupEvents: function( event ) {
		var events = {
			keydown: "_keydown"
		};
		if ( event ) {
			$.each( event.split( " " ), function( index, eventName ) {
				events[ eventName ] = "_eventHandler";
			});
		}

		this._off( this.headers.add( this.headers.next() ) );
		this._on( this.headers, events );
		this._on( this.headers.next(), { keydown: "_panelKeyDown" });
		this._hoverable( this.headers );
		this._focusable( this.headers );
	},

	_eventHandler: function( event ) {
		var options = this.options,
			active = this.active,
			clicked = $( event.currentTarget ),
			clickedIsActive = clicked[ 0 ] === active[ 0 ],
			collapsing = clickedIsActive && options.collapsible,
			toShow = collapsing ? $() : clicked.next(),
			toHide = active.next(),
			eventData = {
				oldHeader: active,
				oldPanel: toHide,
				newHeader: collapsing ? $() : clicked,
				newPanel: toShow
			};

		event.preventDefault();

		if (
				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||
				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
			return;
		}

		options.active = collapsing ? false : this.headers.index( clicked );

		// when the call to ._toggle() comes after the class changes
		// it causes a very odd bug in IE 8 (see #6720)
		this.active = clickedIsActive ? $() : clicked;
		this._toggle( eventData );

		// switch classes
		// corner classes on the previously active header stay after the animation
		active.removeClass( "ui-accordion-header-active ui-state-active" );
		if ( options.icons ) {
			active.children( ".ui-accordion-header-icon" )
				.removeClass( options.icons.activeHeader )
				.addClass( options.icons.header );
		}

		if ( !clickedIsActive ) {
			clicked
				.removeClass( "ui-corner-all" )
				.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" );
			if ( options.icons ) {
				clicked.children( ".ui-accordion-header-icon" )
					.removeClass( options.icons.header )
					.addClass( options.icons.activeHeader );
			}

			clicked
				.next()
				.addClass( "ui-accordion-content-active" );
		}
	},

	_toggle: function( data ) {
		var toShow = data.newPanel,
			toHide = this.prevShow.length ? this.prevShow : data.oldPanel;

		// handle activating a panel during the animation for another activation
		this.prevShow.add( this.prevHide ).stop( true, true );
		this.prevShow = toShow;
		this.prevHide = toHide;

		if ( this.options.animate ) {
			this._animate( toShow, toHide, data );
		} else {
			toHide.hide();
			toShow.show();
			this._toggleComplete( data );
		}

		toHide.attr({
			"aria-hidden": "true"
		});
		toHide.prev().attr({
			"aria-selected": "false",
			"aria-expanded": "false"
		});
		// if we're switching panels, remove the old header from the tab order
		// if we're opening from collapsed state, remove the previous header from the tab order
		// if we're collapsing, then keep the collapsing header in the tab order
		if ( toShow.length && toHide.length ) {
			toHide.prev().attr({
				"tabIndex": -1,
				"aria-expanded": "false"
			});
		} else if ( toShow.length ) {
			this.headers.filter(function() {
				return parseInt( $( this ).attr( "tabIndex" ), 10 ) === 0;
			})
			.attr( "tabIndex", -1 );
		}

		toShow
			.attr( "aria-hidden", "false" )
			.prev()
				.attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				});
	},

	_animate: function( toShow, toHide, data ) {
		var total, easing, duration,
			that = this,
			adjust = 0,
			boxSizing = toShow.css( "box-sizing" ),
			down = toShow.length &&
				( !toHide.length || ( toShow.index() < toHide.index() ) ),
			animate = this.options.animate || {},
			options = down && animate.down || animate,
			complete = function() {
				that._toggleComplete( data );
			};

		if ( typeof options === "number" ) {
			duration = options;
		}
		if ( typeof options === "string" ) {
			easing = options;
		}
		// fall back from options to animation in case of partial down settings
		easing = easing || options.easing || animate.easing;
		duration = duration || options.duration || animate.duration;

		if ( !toHide.length ) {
			return toShow.animate( this.showProps, duration, easing, complete );
		}
		if ( !toShow.length ) {
			return toHide.animate( this.hideProps, duration, easing, complete );
		}

		total = toShow.show().outerHeight();
		toHide.animate( this.hideProps, {
			duration: duration,
			easing: easing,
			step: function( now, fx ) {
				fx.now = Math.round( now );
			}
		});
		toShow
			.hide()
			.animate( this.showProps, {
				duration: duration,
				easing: easing,
				complete: complete,
				step: function( now, fx ) {
					fx.now = Math.round( now );
					if ( fx.prop !== "height" ) {
						if ( boxSizing === "content-box" ) {
							adjust += fx.now;
						}
					} else if ( that.options.heightStyle !== "content" ) {
						fx.now = Math.round( total - toHide.outerHeight() - adjust );
						adjust = 0;
					}
				}
			});
	},

	_toggleComplete: function( data ) {
		var toHide = data.oldPanel;

		toHide
			.removeClass( "ui-accordion-content-active" )
			.prev()
				.removeClass( "ui-corner-top" )
				.addClass( "ui-corner-all" );

		// Work around for rendering bug in IE (#5421)
		if ( toHide.length ) {
			toHide.parent()[ 0 ].className = toHide.parent()[ 0 ].className;
		}
		this._trigger( "activate", null, data );
	}
});


/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */


var menu = $.widget( "ui.menu", {
	version: "1.11.4",
	defaultElement: "<ul>",
	delay: 300,
	options: {
		icons: {
			submenu: "ui-icon-carat-1-e"
		},
		items: "> *",
		menus: "ul",
		position: {
			my: "left-1 top",
			at: "right top"
		},
		role: "menu",

		// callbacks
		blur: null,
		focus: null,
		select: null
	},

	_create: function() {
		this.activeMenu = this.element;

		// Flag used to prevent firing of the click handler
		// as the event bubbles up through nested menus
		this.mouseHandled = false;
		this.element
			.uniqueId()
			.addClass( "ui-menu ui-widget ui-widget-content" )
			.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length )
			.attr({
				role: this.options.role,
				tabIndex: 0
			});

		if ( this.options.disabled ) {
			this.element
				.addClass( "ui-state-disabled" )
				.attr( "aria-disabled", "true" );
		}

		this._on({
			// Prevent focus from sticking to links inside menu after clicking
			// them (focus should always stay on UL during navigation).
			"mousedown .ui-menu-item": function( event ) {
				event.preventDefault();
			},
			"click .ui-menu-item": function( event ) {
				var target = $( event.target );
				if ( !this.mouseHandled && target.not( ".ui-state-disabled" ).length ) {
					this.select( event );

					// Only set the mouseHandled flag if the event will bubble, see #9469.
					if ( !event.isPropagationStopped() ) {
						this.mouseHandled = true;
					}

					// Open submenu on click
					if ( target.has( ".ui-menu" ).length ) {
						this.expand( event );
					} else if ( !this.element.is( ":focus" ) && $( this.document[ 0 ].activeElement ).closest( ".ui-menu" ).length ) {

						// Redirect focus to the menu
						this.element.trigger( "focus", [ true ] );

						// If the active item is on the top level, let it stay active.
						// Otherwise, blur the active item since it is no longer visible.
						if ( this.active && this.active.parents( ".ui-menu" ).length === 1 ) {
							clearTimeout( this.timer );
						}
					}
				}
			},
			"mouseenter .ui-menu-item": function( event ) {
				// Ignore mouse events while typeahead is active, see #10458.
				// Prevents focusing the wrong item when typeahead causes a scroll while the mouse
				// is over an item in the menu
				if ( this.previousFilter ) {
					return;
				}
				var target = $( event.currentTarget );
				// Remove ui-state-active class from siblings of the newly focused menu item
				// to avoid a jump caused by adjacent elements both having a class with a border
				target.siblings( ".ui-state-active" ).removeClass( "ui-state-active" );
				this.focus( event, target );
			},
			mouseleave: "collapseAll",
			"mouseleave .ui-menu": "collapseAll",
			focus: function( event, keepActiveItem ) {
				// If there's already an active item, keep it active
				// If not, activate the first item
				var item = this.active || this.element.find( this.options.items ).eq( 0 );

				if ( !keepActiveItem ) {
					this.focus( event, item );
				}
			},
			blur: function( event ) {
				this._delay(function() {
					if ( !$.contains( this.element[0], this.document[0].activeElement ) ) {
						this.collapseAll( event );
					}
				});
			},
			keydown: "_keydown"
		});

		this.refresh();

		// Clicks outside of a menu collapse any open menus
		this._on( this.document, {
			click: function( event ) {
				if ( this._closeOnDocumentClick( event ) ) {
					this.collapseAll( event );
				}

				// Reset the mouseHandled flag
				this.mouseHandled = false;
			}
		});
	},

	_destroy: function() {
		// Destroy (sub)menus
		this.element
			.removeAttr( "aria-activedescendant" )
			.find( ".ui-menu" ).addBack()
				.removeClass( "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front" )
				.removeAttr( "role" )
				.removeAttr( "tabIndex" )
				.removeAttr( "aria-labelledby" )
				.removeAttr( "aria-expanded" )
				.removeAttr( "aria-hidden" )
				.removeAttr( "aria-disabled" )
				.removeUniqueId()
				.show();

		// Destroy menu items
		this.element.find( ".ui-menu-item" )
			.removeClass( "ui-menu-item" )
			.removeAttr( "role" )
			.removeAttr( "aria-disabled" )
			.removeUniqueId()
			.removeClass( "ui-state-hover" )
			.removeAttr( "tabIndex" )
			.removeAttr( "role" )
			.removeAttr( "aria-haspopup" )
			.children().each( function() {
				var elem = $( this );
				if ( elem.data( "ui-menu-submenu-carat" ) ) {
					elem.remove();
				}
			});

		// Destroy menu dividers
		this.element.find( ".ui-menu-divider" ).removeClass( "ui-menu-divider ui-widget-content" );
	},

	_keydown: function( event ) {
		var match, prev, character, skip,
			preventDefault = true;

		switch ( event.keyCode ) {
		case $.ui.keyCode.PAGE_UP:
			this.previousPage( event );
			break;
		case $.ui.keyCode.PAGE_DOWN:
			this.nextPage( event );
			break;
		case $.ui.keyCode.HOME:
			this._move( "first", "first", event );
			break;
		case $.ui.keyCode.END:
			this._move( "last", "last", event );
			break;
		case $.ui.keyCode.UP:
			this.previous( event );
			break;
		case $.ui.keyCode.DOWN:
			this.next( event );
			break;
		case $.ui.keyCode.LEFT:
			this.collapse( event );
			break;
		case $.ui.keyCode.RIGHT:
			if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
				this.expand( event );
			}
			break;
		case $.ui.keyCode.ENTER:
		case $.ui.keyCode.SPACE:
			this._activate( event );
			break;
		case $.ui.keyCode.ESCAPE:
			this.collapse( event );
			break;
		default:
			preventDefault = false;
			prev = this.previousFilter || "";
			character = String.fromCharCode( event.keyCode );
			skip = false;

			clearTimeout( this.filterTimer );

			if ( character === prev ) {
				skip = true;
			} else {
				character = prev + character;
			}

			match = this._filterMenuItems( character );
			match = skip && match.index( this.active.next() ) !== -1 ?
				this.active.nextAll( ".ui-menu-item" ) :
				match;

			// If no matches on the current filter, reset to the last character pressed
			// to move down the menu to the first item that starts with that character
			if ( !match.length ) {
				character = String.fromCharCode( event.keyCode );
				match = this._filterMenuItems( character );
			}

			if ( match.length ) {
				this.focus( event, match );
				this.previousFilter = character;
				this.filterTimer = this._delay(function() {
					delete this.previousFilter;
				}, 1000 );
			} else {
				delete this.previousFilter;
			}
		}

		if ( preventDefault ) {
			event.preventDefault();
		}
	},

	_activate: function( event ) {
		if ( !this.active.is( ".ui-state-disabled" ) ) {
			if ( this.active.is( "[aria-haspopup='true']" ) ) {
				this.expand( event );
			} else {
				this.select( event );
			}
		}
	},

	refresh: function() {
		var menus, items,
			that = this,
			icon = this.options.icons.submenu,
			submenus = this.element.find( this.options.menus );

		this.element.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length );

		// Initialize nested menus
		submenus.filter( ":not(.ui-menu)" )
			.addClass( "ui-menu ui-widget ui-widget-content ui-front" )
			.hide()
			.attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			})
			.each(function() {
				var menu = $( this ),
					item = menu.parent(),
					submenuCarat = $( "<span>" )
						.addClass( "ui-menu-icon ui-icon " + icon )
						.data( "ui-menu-submenu-carat", true );

				item
					.attr( "aria-haspopup", "true" )
					.prepend( submenuCarat );
				menu.attr( "aria-labelledby", item.attr( "id" ) );
			});

		menus = submenus.add( this.element );
		items = menus.find( this.options.items );

		// Initialize menu-items containing spaces and/or dashes only as dividers
		items.not( ".ui-menu-item" ).each(function() {
			var item = $( this );
			if ( that._isDivider( item ) ) {
				item.addClass( "ui-widget-content ui-menu-divider" );
			}
		});

		// Don't refresh list items that are already adapted
		items.not( ".ui-menu-item, .ui-menu-divider" )
			.addClass( "ui-menu-item" )
			.uniqueId()
			.attr({
				tabIndex: -1,
				role: this._itemRole()
			});

		// Add aria-disabled attribute to any disabled menu item
		items.filter( ".ui-state-disabled" ).attr( "aria-disabled", "true" );

		// If the active item has been removed, blur the menu
		if ( this.active && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
			this.blur();
		}
	},

	_itemRole: function() {
		return {
			menu: "menuitem",
			listbox: "option"
		}[ this.options.role ];
	},

	_setOption: function( key, value ) {
		if ( key === "icons" ) {
			this.element.find( ".ui-menu-icon" )
				.removeClass( this.options.icons.submenu )
				.addClass( value.submenu );
		}
		if ( key === "disabled" ) {
			this.element
				.toggleClass( "ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
		}
		this._super( key, value );
	},

	focus: function( event, item ) {
		var nested, focused;
		this.blur( event, event && event.type === "focus" );

		this._scrollIntoView( item );

		this.active = item.first();
		focused = this.active.addClass( "ui-state-focus" ).removeClass( "ui-state-active" );
		// Only update aria-activedescendant if there's a role
		// otherwise we assume focus is managed elsewhere
		if ( this.options.role ) {
			this.element.attr( "aria-activedescendant", focused.attr( "id" ) );
		}

		// Highlight active parent menu item, if any
		this.active
			.parent()
			.closest( ".ui-menu-item" )
			.addClass( "ui-state-active" );

		if ( event && event.type === "keydown" ) {
			this._close();
		} else {
			this.timer = this._delay(function() {
				this._close();
			}, this.delay );
		}

		nested = item.children( ".ui-menu" );
		if ( nested.length && event && ( /^mouse/.test( event.type ) ) ) {
			this._startOpening(nested);
		}
		this.activeMenu = item.parent();

		this._trigger( "focus", event, { item: item } );
	},

	_scrollIntoView: function( item ) {
		var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
		if ( this._hasScroll() ) {
			borderTop = parseFloat( $.css( this.activeMenu[0], "borderTopWidth" ) ) || 0;
			paddingTop = parseFloat( $.css( this.activeMenu[0], "paddingTop" ) ) || 0;
			offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
			scroll = this.activeMenu.scrollTop();
			elementHeight = this.activeMenu.height();
			itemHeight = item.outerHeight();

			if ( offset < 0 ) {
				this.activeMenu.scrollTop( scroll + offset );
			} else if ( offset + itemHeight > elementHeight ) {
				this.activeMenu.scrollTop( scroll + offset - elementHeight + itemHeight );
			}
		}
	},

	blur: function( event, fromFocus ) {
		if ( !fromFocus ) {
			clearTimeout( this.timer );
		}

		if ( !this.active ) {
			return;
		}

		this.active.removeClass( "ui-state-focus" );
		this.active = null;

		this._trigger( "blur", event, { item: this.active } );
	},

	_startOpening: function( submenu ) {
		clearTimeout( this.timer );

		// Don't open if already open fixes a Firefox bug that caused a .5 pixel
		// shift in the submenu position when mousing over the carat icon
		if ( submenu.attr( "aria-hidden" ) !== "true" ) {
			return;
		}

		this.timer = this._delay(function() {
			this._close();
			this._open( submenu );
		}, this.delay );
	},

	_open: function( submenu ) {
		var position = $.extend({
			of: this.active
		}, this.options.position );

		clearTimeout( this.timer );
		this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )
			.hide()
			.attr( "aria-hidden", "true" );

		submenu
			.show()
			.removeAttr( "aria-hidden" )
			.attr( "aria-expanded", "true" )
			.position( position );
	},

	collapseAll: function( event, all ) {
		clearTimeout( this.timer );
		this.timer = this._delay(function() {
			// If we were passed an event, look for the submenu that contains the event
			var currentMenu = all ? this.element :
				$( event && event.target ).closest( this.element.find( ".ui-menu" ) );

			// If we found no valid submenu ancestor, use the main menu to close all sub menus anyway
			if ( !currentMenu.length ) {
				currentMenu = this.element;
			}

			this._close( currentMenu );

			this.blur( event );
			this.activeMenu = currentMenu;
		}, this.delay );
	},

	// With no arguments, closes the currently active menu - if nothing is active
	// it closes all menus.  If passed an argument, it will search for menus BELOW
	_close: function( startMenu ) {
		if ( !startMenu ) {
			startMenu = this.active ? this.active.parent() : this.element;
		}

		startMenu
			.find( ".ui-menu" )
				.hide()
				.attr( "aria-hidden", "true" )
				.attr( "aria-expanded", "false" )
			.end()
			.find( ".ui-state-active" ).not( ".ui-state-focus" )
				.removeClass( "ui-state-active" );
	},

	_closeOnDocumentClick: function( event ) {
		return !$( event.target ).closest( ".ui-menu" ).length;
	},

	_isDivider: function( item ) {

		// Match hyphen, em dash, en dash
		return !/[^\-\u2014\u2013\s]/.test( item.text() );
	},

	collapse: function( event ) {
		var newItem = this.active &&
			this.active.parent().closest( ".ui-menu-item", this.element );
		if ( newItem && newItem.length ) {
			this._close();
			this.focus( event, newItem );
		}
	},

	expand: function( event ) {
		var newItem = this.active &&
			this.active
				.children( ".ui-menu " )
				.find( this.options.items )
				.first();

		if ( newItem && newItem.length ) {
			this._open( newItem.parent() );

			// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
			this._delay(function() {
				this.focus( event, newItem );
			});
		}
	},

	next: function( event ) {
		this._move( "next", "first", event );
	},

	previous: function( event ) {
		this._move( "prev", "last", event );
	},

	isFirstItem: function() {
		return this.active && !this.active.prevAll( ".ui-menu-item" ).length;
	},

	isLastItem: function() {
		return this.active && !this.active.nextAll( ".ui-menu-item" ).length;
	},

	_move: function( direction, filter, event ) {
		var next;
		if ( this.active ) {
			if ( direction === "first" || direction === "last" ) {
				next = this.active
					[ direction === "first" ? "prevAll" : "nextAll" ]( ".ui-menu-item" )
					.eq( -1 );
			} else {
				next = this.active
					[ direction + "All" ]( ".ui-menu-item" )
					.eq( 0 );
			}
		}
		if ( !next || !next.length || !this.active ) {
			next = this.activeMenu.find( this.options.items )[ filter ]();
		}

		this.focus( event, next );
	},

	nextPage: function( event ) {
		var item, base, height;

		if ( !this.active ) {
			this.next( event );
			return;
		}
		if ( this.isLastItem() ) {
			return;
		}
		if ( this._hasScroll() ) {
			base = this.active.offset().top;
			height = this.element.height();
			this.active.nextAll( ".ui-menu-item" ).each(function() {
				item = $( this );
				return item.offset().top - base - height < 0;
			});

			this.focus( event, item );
		} else {
			this.focus( event, this.activeMenu.find( this.options.items )
				[ !this.active ? "first" : "last" ]() );
		}
	},

	previousPage: function( event ) {
		var item, base, height;
		if ( !this.active ) {
			this.next( event );
			return;
		}
		if ( this.isFirstItem() ) {
			return;
		}
		if ( this._hasScroll() ) {
			base = this.active.offset().top;
			height = this.element.height();
			this.active.prevAll( ".ui-menu-item" ).each(function() {
				item = $( this );
				return item.offset().top - base + height > 0;
			});

			this.focus( event, item );
		} else {
			this.focus( event, this.activeMenu.find( this.options.items ).first() );
		}
	},

	_hasScroll: function() {
		return this.element.outerHeight() < this.element.prop( "scrollHeight" );
	},

	select: function( event ) {
		// TODO: It should never be possible to not have an active item at this
		// point, but the tests don't trigger mouseenter before click.
		this.active = this.active || $( event.target ).closest( ".ui-menu-item" );
		var ui = { item: this.active };
		if ( !this.active.has( ".ui-menu" ).length ) {
			this.collapseAll( event, true );
		}
		this._trigger( "select", event, ui );
	},

	_filterMenuItems: function(character) {
		var escapedCharacter = character.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ),
			regex = new RegExp( "^" + escapedCharacter, "i" );

		return this.activeMenu
			.find( this.options.items )

			// Only match on items, not dividers or other content (#10571)
			.filter( ".ui-menu-item" )
			.filter(function() {
				return regex.test( $.trim( $( this ).text() ) );
			});
	}
});


/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */


$.widget( "ui.autocomplete", {
	version: "1.11.4",
	defaultElement: "<input>",
	options: {
		appendTo: null,
		autoFocus: false,
		delay: 300,
		minLength: 1,
		position: {
			my: "left top",
			at: "left bottom",
			collision: "none"
		},
		source: null,

		// callbacks
		change: null,
		close: null,
		focus: null,
		open: null,
		response: null,
		search: null,
		select: null
	},

	requestIndex: 0,
	pending: 0,

	_create: function() {
		// Some browsers only repeat keydown events, not keypress events,
		// so we use the suppressKeyPress flag to determine if we've already
		// handled the keydown event. #7269
		// Unfortunately the code for & in keypress is the same as the up arrow,
		// so we use the suppressKeyPressRepeat flag to avoid handling keypress
		// events when we know the keydown event was used to modify the
		// search term. #7799
		var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
			nodeName = this.element[ 0 ].nodeName.toLowerCase(),
			isTextarea = nodeName === "textarea",
			isInput = nodeName === "input";

		this.isMultiLine =
			// Textareas are always multi-line
			isTextarea ? true :
			// Inputs are always single-line, even if inside a contentEditable element
			// IE also treats inputs as contentEditable
			isInput ? false :
			// All other element types are determined by whether or not they're contentEditable
			this.element.prop( "isContentEditable" );

		this.valueMethod = this.element[ isTextarea || isInput ? "val" : "text" ];
		this.isNewMenu = true;

		this.element
			.addClass( "ui-autocomplete-input" )
			.attr( "autocomplete", "off" );

		this._on( this.element, {
			keydown: function( event ) {
				if ( this.element.prop( "readOnly" ) ) {
					suppressKeyPress = true;
					suppressInput = true;
					suppressKeyPressRepeat = true;
					return;
				}

				suppressKeyPress = false;
				suppressInput = false;
				suppressKeyPressRepeat = false;
				var keyCode = $.ui.keyCode;
				switch ( event.keyCode ) {
				case keyCode.PAGE_UP:
					suppressKeyPress = true;
					this._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					suppressKeyPress = true;
					this._move( "nextPage", event );
					break;
				case keyCode.UP:
					suppressKeyPress = true;
					this._keyEvent( "previous", event );
					break;
				case keyCode.DOWN:
					suppressKeyPress = true;
					this._keyEvent( "next", event );
					break;
				case keyCode.ENTER:
					// when menu is open and has focus
					if ( this.menu.active ) {
						// #6055 - Opera still allows the keypress to occur
						// which causes forms to submit
						suppressKeyPress = true;
						event.preventDefault();
						this.menu.select( event );
					}
					break;
				case keyCode.TAB:
					if ( this.menu.active ) {
						this.menu.select( event );
					}
					break;
				case keyCode.ESCAPE:
					if ( this.menu.element.is( ":visible" ) ) {
						if ( !this.isMultiLine ) {
							this._value( this.term );
						}
						this.close( event );
						// Different browsers have different default behavior for escape
						// Single press can mean undo or clear
						// Double press in IE means clear the whole form
						event.preventDefault();
					}
					break;
				default:
					suppressKeyPressRepeat = true;
					// search timeout should be triggered before the input value is changed
					this._searchTimeout( event );
					break;
				}
			},
			keypress: function( event ) {
				if ( suppressKeyPress ) {
					suppressKeyPress = false;
					if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
						event.preventDefault();
					}
					return;
				}
				if ( suppressKeyPressRepeat ) {
					return;
				}

				// replicate some key handlers to allow them to repeat in Firefox and Opera
				var keyCode = $.ui.keyCode;
				switch ( event.keyCode ) {
				case keyCode.PAGE_UP:
					this._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					this._move( "nextPage", event );
					break;
				case keyCode.UP:
					this._keyEvent( "previous", event );
					break;
				case keyCode.DOWN:
					this._keyEvent( "next", event );
					break;
				}
			},
			input: function( event ) {
				if ( suppressInput ) {
					suppressInput = false;
					event.preventDefault();
					return;
				}
				this._searchTimeout( event );
			},
			focus: function() {
				this.selectedItem = null;
				this.previous = this._value();
			},
			blur: function( event ) {
				if ( this.cancelBlur ) {
					delete this.cancelBlur;
					return;
				}

				clearTimeout( this.searching );
				this.close( event );
				this._change( event );
			}
		});

		this._initSource();
		this.menu = $( "<ul>" )
			.addClass( "ui-autocomplete ui-front" )
			.appendTo( this._appendTo() )
			.menu({
				// disable ARIA support, the live region takes care of that
				role: null
			})
			.hide()
			.menu( "instance" );

		this._on( this.menu.element, {
			mousedown: function( event ) {
				// prevent moving focus out of the text field
				event.preventDefault();

				// IE doesn't prevent moving focus even with event.preventDefault()
				// so we set a flag to know when we should ignore the blur event
				this.cancelBlur = true;
				this._delay(function() {
					delete this.cancelBlur;
				});

				// clicking on the scrollbar causes focus to shift to the body
				// but we can't detect a mouseup or a click immediately afterward
				// so we have to track the next mousedown and close the menu if
				// the user clicks somewhere outside of the autocomplete
				var menuElement = this.menu.element[ 0 ];
				if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
					this._delay(function() {
						var that = this;
						this.document.one( "mousedown", function( event ) {
							if ( event.target !== that.element[ 0 ] &&
									event.target !== menuElement &&
									!$.contains( menuElement, event.target ) ) {
								that.close();
							}
						});
					});
				}
			},
			menufocus: function( event, ui ) {
				var label, item;
				// support: Firefox
				// Prevent accidental activation of menu items in Firefox (#7024 #9118)
				if ( this.isNewMenu ) {
					this.isNewMenu = false;
					if ( event.originalEvent && /^mouse/.test( event.originalEvent.type ) ) {
						this.menu.blur();

						this.document.one( "mousemove", function() {
							$( event.target ).trigger( event.originalEvent );
						});

						return;
					}
				}

				item = ui.item.data( "ui-autocomplete-item" );
				if ( false !== this._trigger( "focus", event, { item: item } ) ) {
					// use value to match what will end up in the input, if it was a key event
					if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {
						this._value( item.value );
					}
				}

				// Announce the value in the liveRegion
				label = ui.item.attr( "aria-label" ) || item.value;
				if ( label && $.trim( label ).length ) {
					this.liveRegion.children().hide();
					$( "<div>" ).text( label ).appendTo( this.liveRegion );
				}
			},
			menuselect: function( event, ui ) {
				var item = ui.item.data( "ui-autocomplete-item" ),
					previous = this.previous;

				// only trigger when focus was lost (click on menu)
				if ( this.element[ 0 ] !== this.document[ 0 ].activeElement ) {
					this.element.focus();
					this.previous = previous;
					// #6109 - IE triggers two focus events and the second
					// is asynchronous, so we need to reset the previous
					// term synchronously and asynchronously :-(
					this._delay(function() {
						this.previous = previous;
						this.selectedItem = item;
					});
				}

				if ( false !== this._trigger( "select", event, { item: item } ) ) {
					this._value( item.value );
				}
				// reset the term after the select event
				// this allows custom select handling to work properly
				this.term = this._value();

				this.close( event );
				this.selectedItem = item;
			}
		});

		this.liveRegion = $( "<span>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			})
			.addClass( "ui-helper-hidden-accessible" )
			.appendTo( this.document[ 0 ].body );

		// turning off autocomplete prevents the browser from remembering the
		// value when navigating through history, so we re-enable autocomplete
		// if the page is unloaded before the widget is destroyed. #7790
		this._on( this.window, {
			beforeunload: function() {
				this.element.removeAttr( "autocomplete" );
			}
		});
	},

	_destroy: function() {
		clearTimeout( this.searching );
		this.element
			.removeClass( "ui-autocomplete-input" )
			.removeAttr( "autocomplete" );
		this.menu.element.remove();
		this.liveRegion.remove();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "source" ) {
			this._initSource();
		}
		if ( key === "appendTo" ) {
			this.menu.element.appendTo( this._appendTo() );
		}
		if ( key === "disabled" && value && this.xhr ) {
			this.xhr.abort();
		}
	},

	_appendTo: function() {
		var element = this.options.appendTo;

		if ( element ) {
			element = element.jquery || element.nodeType ?
				$( element ) :
				this.document.find( element ).eq( 0 );
		}

		if ( !element || !element[ 0 ] ) {
			element = this.element.closest( ".ui-front" );
		}

		if ( !element.length ) {
			element = this.document[ 0 ].body;
		}

		return element;
	},

	_initSource: function() {
		var array, url,
			that = this;
		if ( $.isArray( this.options.source ) ) {
			array = this.options.source;
			this.source = function( request, response ) {
				response( $.ui.autocomplete.filter( array, request.term ) );
			};
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
			this.source = function( request, response ) {
				if ( that.xhr ) {
					that.xhr.abort();
				}
				that.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					success: function( data ) {
						response( data );
					},
					error: function() {
						response([]);
					}
				});
			};
		} else {
			this.source = this.options.source;
		}
	},

	_searchTimeout: function( event ) {
		clearTimeout( this.searching );
		this.searching = this._delay(function() {

			// Search if the value has changed, or if the user retypes the same value (see #7434)
			var equalValues = this.term === this._value(),
				menuVisible = this.menu.element.is( ":visible" ),
				modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

			if ( !equalValues || ( equalValues && !menuVisible && !modifierKey ) ) {
				this.selectedItem = null;
				this.search( null, event );
			}
		}, this.options.delay );
	},

	search: function( value, event ) {
		value = value != null ? value : this._value();

		// always save the actual value, not the one passed as an argument
		this.term = this._value();

		if ( value.length < this.options.minLength ) {
			return this.close( event );
		}

		if ( this._trigger( "search", event ) === false ) {
			return;
		}

		return this._search( value );
	},

	_search: function( value ) {
		this.pending++;
		this.element.addClass( "ui-autocomplete-loading" );
		this.cancelSearch = false;

		this.source( { term: value }, this._response() );
	},

	_response: function() {
		var index = ++this.requestIndex;

		return $.proxy(function( content ) {
			if ( index === this.requestIndex ) {
				this.__response( content );
			}

			this.pending--;
			if ( !this.pending ) {
				this.element.removeClass( "ui-autocomplete-loading" );
			}
		}, this );
	},

	__response: function( content ) {
		if ( content ) {
			content = this._normalize( content );
		}
		this._trigger( "response", null, { content: content } );
		if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {
			this._suggest( content );
			this._trigger( "open" );
		} else {
			// use ._close() instead of .close() so we don't cancel future searches
			this._close();
		}
	},

	close: function( event ) {
		this.cancelSearch = true;
		this._close( event );
	},

	_close: function( event ) {
		if ( this.menu.element.is( ":visible" ) ) {
			this.menu.element.hide();
			this.menu.blur();
			this.isNewMenu = true;
			this._trigger( "close", event );
		}
	},

	_change: function( event ) {
		if ( this.previous !== this._value() ) {
			this._trigger( "change", event, { item: this.selectedItem } );
		}
	},

	_normalize: function( items ) {
		// assume all items have the right format when the first item is complete
		if ( items.length && items[ 0 ].label && items[ 0 ].value ) {
			return items;
		}
		return $.map( items, function( item ) {
			if ( typeof item === "string" ) {
				return {
					label: item,
					value: item
				};
			}
			return $.extend( {}, item, {
				label: item.label || item.value,
				value: item.value || item.label
			});
		});
	},

	_suggest: function( items ) {
		var ul = this.menu.element.empty();
		this._renderMenu( ul, items );
		this.isNewMenu = true;
		this.menu.refresh();

		// size and position menu
		ul.show();
		this._resizeMenu();
		ul.position( $.extend({
			of: this.element
		}, this.options.position ) );

		if ( this.options.autoFocus ) {
			this.menu.next();
		}
	},

	_resizeMenu: function() {
		var ul = this.menu.element;
		ul.outerWidth( Math.max(
			// Firefox wraps long text (possibly a rounding bug)
			// so we add 1px to avoid the wrapping (#7513)
			ul.width( "" ).outerWidth() + 1,
			this.element.outerWidth()
		) );
	},

	_renderMenu: function( ul, items ) {
		var that = this;
		$.each( items, function( index, item ) {
			that._renderItemData( ul, item );
		});
	},

	_renderItemData: function( ul, item ) {
		return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
	},

	_renderItem: function( ul, item ) {
		return $( "<li>" ).text( item.label ).appendTo( ul );
	},

	_move: function( direction, event ) {
		if ( !this.menu.element.is( ":visible" ) ) {
			this.search( null, event );
			return;
		}
		if ( this.menu.isFirstItem() && /^previous/.test( direction ) ||
				this.menu.isLastItem() && /^next/.test( direction ) ) {

			if ( !this.isMultiLine ) {
				this._value( this.term );
			}

			this.menu.blur();
			return;
		}
		this.menu[ direction ]( event );
	},

	widget: function() {
		return this.menu.element;
	},

	_value: function() {
		return this.valueMethod.apply( this.element, arguments );
	},

	_keyEvent: function( keyEvent, event ) {
		if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
			this._move( keyEvent, event );

			// prevents moving cursor to beginning/end of the text field in some browsers
			event.preventDefault();
		}
	}
});

$.extend( $.ui.autocomplete, {
	escapeRegex: function( value ) {
		return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
	},
	filter: function( array, term ) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex( term ), "i" );
		return $.grep( array, function( value ) {
			return matcher.test( value.label || value.value || value );
		});
	}
});

// live region extension, adding a `messages` option
// NOTE: This is an experimental API. We are still investigating
// a full solution for string manipulation and internationalization.
$.widget( "ui.autocomplete", $.ui.autocomplete, {
	options: {
		messages: {
			noResults: "No search results.",
			results: function( amount ) {
				return amount + ( amount > 1 ? " results are" : " result is" ) +
					" available, use up and down arrow keys to navigate.";
			}
		}
	},

	__response: function( content ) {
		var message;
		this._superApply( arguments );
		if ( this.options.disabled || this.cancelSearch ) {
			return;
		}
		if ( content && content.length ) {
			message = this.options.messages.results( content.length );
		} else {
			message = this.options.messages.noResults;
		}
		this.liveRegion.children().hide();
		$( "<div>" ).text( message ).appendTo( this.liveRegion );
	}
});

var autocomplete = $.ui.autocomplete;


/*!
 * jQuery UI Button 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 */


var lastActive,
	baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
	typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
	formResetHandler = function() {
		var form = $( this );
		setTimeout(function() {
			form.find( ":ui-button" ).button( "refresh" );
		}, 1 );
	},
	radioGroup = function( radio ) {
		var name = radio.name,
			form = radio.form,
			radios = $( [] );
		if ( name ) {
			name = name.replace( /'/g, "\\'" );
			if ( form ) {
				radios = $( form ).find( "[name='" + name + "'][type=radio]" );
			} else {
				radios = $( "[name='" + name + "'][type=radio]", radio.ownerDocument )
					.filter(function() {
						return !this.form;
					});
			}
		}
		return radios;
	};

$.widget( "ui.button", {
	version: "1.11.4",
	defaultElement: "<button>",
	options: {
		disabled: null,
		text: true,
		label: null,
		icons: {
			primary: null,
			secondary: null
		}
	},
	_create: function() {
		this.element.closest( "form" )
			.unbind( "reset" + this.eventNamespace )
			.bind( "reset" + this.eventNamespace, formResetHandler );

		if ( typeof this.options.disabled !== "boolean" ) {
			this.options.disabled = !!this.element.prop( "disabled" );
		} else {
			this.element.prop( "disabled", this.options.disabled );
		}

		this._determineButtonType();
		this.hasTitle = !!this.buttonElement.attr( "title" );

		var that = this,
			options = this.options,
			toggleButton = this.type === "checkbox" || this.type === "radio",
			activeClass = !toggleButton ? "ui-state-active" : "";

		if ( options.label === null ) {
			options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
		}

		this._hoverable( this.buttonElement );

		this.buttonElement
			.addClass( baseClasses )
			.attr( "role", "button" )
			.bind( "mouseenter" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return;
				}
				if ( this === lastActive ) {
					$( this ).addClass( "ui-state-active" );
				}
			})
			.bind( "mouseleave" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( activeClass );
			})
			.bind( "click" + this.eventNamespace, function( event ) {
				if ( options.disabled ) {
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			});

		// Can't use _focusable() because the element that receives focus
		// and the element that gets the ui-state-focus class are different
		this._on({
			focus: function() {
				this.buttonElement.addClass( "ui-state-focus" );
			},
			blur: function() {
				this.buttonElement.removeClass( "ui-state-focus" );
			}
		});

		if ( toggleButton ) {
			this.element.bind( "change" + this.eventNamespace, function() {
				that.refresh();
			});
		}

		if ( this.type === "checkbox" ) {
			this.buttonElement.bind( "click" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return false;
				}
			});
		} else if ( this.type === "radio" ) {
			this.buttonElement.bind( "click" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return false;
				}
				$( this ).addClass( "ui-state-active" );
				that.buttonElement.attr( "aria-pressed", "true" );

				var radio = that.element[ 0 ];
				radioGroup( radio )
					.not( radio )
					.map(function() {
						return $( this ).button( "widget" )[ 0 ];
					})
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			});
		} else {
			this.buttonElement
				.bind( "mousedown" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).addClass( "ui-state-active" );
					lastActive = this;
					that.document.one( "mouseup", function() {
						lastActive = null;
					});
				})
				.bind( "mouseup" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).removeClass( "ui-state-active" );
				})
				.bind( "keydown" + this.eventNamespace, function(event) {
					if ( options.disabled ) {
						return false;
					}
					if ( event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER ) {
						$( this ).addClass( "ui-state-active" );
					}
				})
				// see #8559, we bind to blur here in case the button element loses
				// focus between keydown and keyup, it would be left in an "active" state
				.bind( "keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
					$( this ).removeClass( "ui-state-active" );
				});

			if ( this.buttonElement.is("a") ) {
				this.buttonElement.keyup(function(event) {
					if ( event.keyCode === $.ui.keyCode.SPACE ) {
						// TODO pass through original event correctly (just as 2nd argument doesn't work)
						$( this ).click();
					}
				});
			}
		}

		this._setOption( "disabled", options.disabled );
		this._resetButton();
	},

	_determineButtonType: function() {
		var ancestor, labelSelector, checked;

		if ( this.element.is("[type=checkbox]") ) {
			this.type = "checkbox";
		} else if ( this.element.is("[type=radio]") ) {
			this.type = "radio";
		} else if ( this.element.is("input") ) {
			this.type = "input";
		} else {
			this.type = "button";
		}

		if ( this.type === "checkbox" || this.type === "radio" ) {
			// we don't search against the document in case the element
			// is disconnected from the DOM
			ancestor = this.element.parents().last();
			labelSelector = "label[for='" + this.element.attr("id") + "']";
			this.buttonElement = ancestor.find( labelSelector );
			if ( !this.buttonElement.length ) {
				ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
				this.buttonElement = ancestor.filter( labelSelector );
				if ( !this.buttonElement.length ) {
					this.buttonElement = ancestor.find( labelSelector );
				}
			}
			this.element.addClass( "ui-helper-hidden-accessible" );

			checked = this.element.is( ":checked" );
			if ( checked ) {
				this.buttonElement.addClass( "ui-state-active" );
			}
			this.buttonElement.prop( "aria-pressed", checked );
		} else {
			this.buttonElement = this.element;
		}
	},

	widget: function() {
		return this.buttonElement;
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-helper-hidden-accessible" );
		this.buttonElement
			.removeClass( baseClasses + " ui-state-active " + typeClasses )
			.removeAttr( "role" )
			.removeAttr( "aria-pressed" )
			.html( this.buttonElement.find(".ui-button-text").html() );

		if ( !this.hasTitle ) {
			this.buttonElement.removeAttr( "title" );
		}
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "disabled" ) {
			this.widget().toggleClass( "ui-state-disabled", !!value );
			this.element.prop( "disabled", !!value );
			if ( value ) {
				if ( this.type === "checkbox" || this.type === "radio" ) {
					this.buttonElement.removeClass( "ui-state-focus" );
				} else {
					this.buttonElement.removeClass( "ui-state-focus ui-state-active" );
				}
			}
			return;
		}
		this._resetButton();
	},

	refresh: function() {
		//See #8237 & #8828
		var isDisabled = this.element.is( "input, button" ) ? this.element.is( ":disabled" ) : this.element.hasClass( "ui-button-disabled" );

		if ( isDisabled !== this.options.disabled ) {
			this._setOption( "disabled", isDisabled );
		}
		if ( this.type === "radio" ) {
			radioGroup( this.element[0] ).each(function() {
				if ( $( this ).is( ":checked" ) ) {
					$( this ).button( "widget" )
						.addClass( "ui-state-active" )
						.attr( "aria-pressed", "true" );
				} else {
					$( this ).button( "widget" )
						.removeClass( "ui-state-active" )
						.attr( "aria-pressed", "false" );
				}
			});
		} else if ( this.type === "checkbox" ) {
			if ( this.element.is( ":checked" ) ) {
				this.buttonElement
					.addClass( "ui-state-active" )
					.attr( "aria-pressed", "true" );
			} else {
				this.buttonElement
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			}
		}
	},

	_resetButton: function() {
		if ( this.type === "input" ) {
			if ( this.options.label ) {
				this.element.val( this.options.label );
			}
			return;
		}
		var buttonElement = this.buttonElement.removeClass( typeClasses ),
			buttonText = $( "<span></span>", this.document[0] )
				.addClass( "ui-button-text" )
				.html( this.options.label )
				.appendTo( buttonElement.empty() )
				.text(),
			icons = this.options.icons,
			multipleIcons = icons.primary && icons.secondary,
			buttonClasses = [];

		if ( icons.primary || icons.secondary ) {
			if ( this.options.text ) {
				buttonClasses.push( "ui-button-text-icon" + ( multipleIcons ? "s" : ( icons.primary ? "-primary" : "-secondary" ) ) );
			}

			if ( icons.primary ) {
				buttonElement.prepend( "<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>" );
			}

			if ( icons.secondary ) {
				buttonElement.append( "<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>" );
			}

			if ( !this.options.text ) {
				buttonClasses.push( multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only" );

				if ( !this.hasTitle ) {
					buttonElement.attr( "title", $.trim( buttonText ) );
				}
			}
		} else {
			buttonClasses.push( "ui-button-text-only" );
		}
		buttonElement.addClass( buttonClasses.join( " " ) );
	}
});

$.widget( "ui.buttonset", {
	version: "1.11.4",
	options: {
		items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
	},

	_create: function() {
		this.element.addClass( "ui-buttonset" );
	},

	_init: function() {
		this.refresh();
	},

	_setOption: function( key, value ) {
		if ( key === "disabled" ) {
			this.buttons.button( "option", key, value );
		}

		this._super( key, value );
	},

	refresh: function() {
		var rtl = this.element.css( "direction" ) === "rtl",
			allButtons = this.element.find( this.options.items ),
			existingButtons = allButtons.filter( ":ui-button" );

		// Initialize new buttons
		allButtons.not( ":ui-button" ).button();

		// Refresh existing buttons
		existingButtons.button( "refresh" );

		this.buttons = allButtons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
				.filter( ":first" )
					.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )
				.end()
				.filter( ":last" )
					.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )
				.end()
			.end();
	},

	_destroy: function() {
		this.element.removeClass( "ui-buttonset" );
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-left ui-corner-right" )
			.end()
			.button( "destroy" );
	}
});

var button = $.ui.button;


/*!
 * jQuery UI Datepicker 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */


$.extend($.ui, { datepicker: { version: "1.11.4" } });

var datepicker_instActive;

function datepicker_getZindex( elem ) {
	var position, value;
	while ( elem.length && elem[ 0 ] !== document ) {
		// Ignore z-index if position is set to a value where z-index is ignored by the browser
		// This makes behavior of this function consistent across browsers
		// WebKit always returns auto if the element is positioned
		position = elem.css( "position" );
		if ( position === "absolute" || position === "relative" || position === "fixed" ) {
			// IE returns 0 when zIndex is not specified
			// other browsers return a string
			// we ignore the case of nested elements with an explicit value of 0
			// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
			value = parseInt( elem.css( "zIndex" ), 10 );
			if ( !isNaN( value ) && value !== 0 ) {
				return value;
			}
		}
		elem = elem.parent();
	}

	return 0;
}
/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
	this._appendClass = "ui-datepicker-append"; // The name of the append marker class
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[""] = { // Default regional settings
		closeText: "Done", // Display text for close link
		prevText: "Prev", // Display text for previous month link
		nextText: "Next", // Display text for next month link
		currentText: "Today", // Display text for current month link
		monthNames: ["January","February","March","April","May","June",
			"July","August","September","October","November","December"], // Names of months for drop-down and formatting
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
		weekHeader: "Wk", // Column header for week of the year
		dateFormat: "mm/dd/yy", // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: "" // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: "focus", // "focus" for popup on focus,
			// "button" for trigger button, or "both" for either
		showAnim: "fadeIn", // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: "fast", // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional[""]);
	this.regional.en = $.extend( true, {}, this.regional[ "" ]);
	this.regional[ "en-US" ] = $.extend( true, {}, this.regional.en );
	this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: "hasDatepicker",

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */
	setDefaults: function(settings) {
		datepicker_extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */
	_attachDatepicker: function(target, settings) {
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = (nodeName === "div" || nodeName === "span");
		if (!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {});
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp);
		this._autoSize(inst);
		$.data(target, "datepicker", inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var showOn, buttonText, buttonImage,
			appendText = this._get(inst, "appendText"),
			isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.unbind("focus", this._showDatepicker);

		if (inst.trigger) {
			inst.trigger.remove();
		}

		showOn = this._get(inst, "showOn");
		if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		}
		if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
			buttonText = this._get(inst, "buttonText");
			buttonImage = this._get(inst, "buttonImage");
			inst.trigger = $(this._get(inst, "buttonImageOnly") ?
				$("<img/>").addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$("<button type='button'></button>").addClass(this._triggerClass).
					html(!buttonImage ? buttonText : $("<img/>").attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? "before" : "after"](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else {
					$.datepicker._showDatepicker(input[0]);
				}
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax, max, maxI, i,
				date = new Date(2009, 12 - 1, 20), // Ensure double digits
				dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					"monthNames" : "monthNamesShort"))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, "datepicker", inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var id, browserWidth, browserHeight, scrollX, scrollY,
			inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id +
				"' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.keydown(this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], "datepicker", inst);
		}
		datepicker_extendRemove(inst.settings, settings || {});
		date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], "datepicker", inst);
		return this;
	},

	/* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */
	_destroyDatepicker: function(target) {
		var nodeName,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, "datepicker");
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind("focus", this._showDatepicker).
				unbind("keydown", this._doKeyDown).
				unbind("keypress", this._doKeyPress).
				unbind("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}

		if ( datepicker_instActive === inst ) {
			datepicker_instActive = null;
		}
	},

	/* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_enableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").
				each(function() { this.disabled = false; }).end().
				filter("img").css({opacity: "1.0", cursor: ""});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_disableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.filter("button").
				each(function() { this.disabled = true; }).end().
				filter("img").css({opacity: "0.5", cursor: "default"});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */
	_getInst: function(target) {
		try {
			return $.data(target, "datepicker");
		}
		catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */
	_optionDatepicker: function(target, name, value) {
		var settings, date, minDate, maxDate,
			inst = this._getInst(target);

		if (arguments.length === 2 && typeof name === "string") {
			return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name === "all" ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}

		settings = name || {};
		if (typeof name === "string") {
			settings = {};
			settings[name] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date = this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			datepicker_extendRemove(inst.settings, settings);
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			if ( "disabled" in settings ) {
				if ( settings.disabled ) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var onSelect, dateStr, sel,
			inst = $.datepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
									$.datepicker._currentClass + ")", inst.dpDiv);
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						}

						onSelect = $.datepicker._get(inst, "onSelect");
						if (onSelect) {
							dateStr = $.datepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else {
							$.datepicker._hideDatepicker();
						}

						return false; // don't submit the form
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, "stepBigMonths") :
							-$.datepicker._get(inst, "stepMonths")), "M");
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, "stepBigMonths") :
							+$.datepicker._get(inst, "stepMonths")), "M");
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var chars, chr,
			inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var date,
			inst = $.datepicker._getInst(event.target);

		if (inst.input.val() !== inst.lastVal) {
			try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));

				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (err) {
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed,
			offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			return;
		}
		datepicker_extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ($.datepicker._inDialog) { // hide cursor
			input.value = "";
		}
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}

		isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		//to avoid flashes on Firefox
		inst.dpDiv.empty();
		// determine sizing offscreen
		inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
			left: offset.left + "px", top: offset.top + "px"});

		if (!inst.inline) {
			showAnim = $.datepicker._get(inst, "showAnim");
			duration = $.datepicker._get(inst, "duration");
			inst.dpDiv.css( "z-index", datepicker_getZindex( $( input ) ) + 1 );
			$.datepicker._datepickerShowing = true;

			if ( $.effects && $.effects.effect[ showAnim ] ) {
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
			} else {
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
			}

			if ( $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.focus();
			}

			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		datepicker_instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);

		var origyearshtml,
			numMonths = this._getNumberOfMonths(inst),
			cols = numMonths[1],
			width = 17,
			activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" );

		if ( activeCell.length > 0 ) {
			datepicker_handleMouseover.apply( activeCell.get( 0 ) );
		}

		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
			"Class"]("ui-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
			"Class"]("ui-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
			inst.input.focus();
		}

		// deffered render of the years select (to avoid flashes on Firefox)
		if( inst.yearshtml ){
			origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//assure that inst.yearshtml didn't change.
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	// #6694 - don't focus the input if it's already focused
	// this breaks the change event in IE
	// Support: IE and jQuery <1.9
	_shouldFocusInput: function( inst ) {
		return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
			dpHeight = inst.dpDiv.outerHeight(),
			inputWidth = inst.input ? inst.input.outerWidth() : 0,
			inputHeight = inst.input ? inst.input.outerHeight() : 0,
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var position,
			inst = this._getInst(obj),
			isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */
	_hideDatepicker: function(input) {
		var showAnim, duration, postProcess, onClose,
			inst = this._curInst;

		if (!inst || (input && inst !== $.data(input, "datepicker"))) {
			return;
		}

		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
			}

			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
				$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
				$.datepicker._hideDatepicker();
		}
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var date,
			target = $(id),
			inst = this._getInst(target[0]);

		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		inst["selected" + (period === "M" ? "Month" : "Year")] =
		inst["draw" + (period === "M" ? "Month" : "Year")] =
			parseInt(select.options[select.selectedIndex].value,10);

		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var inst,
			target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}

		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		this._selectDate(target, "");
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var onSelect,
			target = $(id),
			inst = this._getInst(target[0]);

		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input) {
			inst.input.val(dateStr);
		}
		this._updateAlternate(inst);

		onSelect = this._get(inst, "onSelect");
		if (onSelect) {
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		} else if (inst.input) {
			inst.input.trigger("change"); // fire the change event
		}

		if (inst.inline){
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) !== "object") {
				inst.input.focus(); // restore focus
			}
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altFormat, date, dateStr,
			altField = this._get(inst, "altField");

		if (altField) { // update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ""];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */
	iso8601Week: function(date) {
		var time,
			checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */
	parseDate: function (format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}

		value = (typeof value === "object" ? value.toString() : value + "");
		if (value === "") {
			return null;
		}

		var iFormat, dim, extra,
			iValue = 0,
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			year = -1,
			month = -1,
			day = -1,
			doy = -1,
			literal = false,
			date,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Extract a number from the string value
			getNumber = function(match) {
				var isDoubled = lookAhead(match),
					size = (match === "@" ? 14 : (match === "!" ? 20 :
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
					minSize = (match === "y" ? size : 1),
					digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
					num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},
			// Extract a name from the string value and convert to an index
			getName = function(match, shortNames, longNames) {
				var index = -1,
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
						return [ [k, v] ];
					}).sort(function (a, b) {
						return -(a[1].length - b[1].length);
					});

				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index !== -1) {
					return index + 1;
				} else {
					throw "Unknown name at position " + iValue;
				}
			},
			// Confirm that a literal character matches the string value
			checkLiteral = function() {
				if (value.charAt(iValue) !== format.charAt(iFormat)) {
					throw "Unexpected literal at position " + iValue;
				}
				iValue++;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
						day = getNumber("d");
						break;
					case "D":
						getName("D", dayNamesShort, dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", monthNamesShort, monthNames);
						break;
					case "y":
						year = getNumber("y");
						break;
					case "@":
						date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "!":
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")){
							checkLiteral();
						} else {
							literal = true;
						}
						break;
					default:
						checkLiteral();
				}
			}
		}

		if (iValue < value.length){
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		}

		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	},

	/* Standard date formats. */
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */
	formatDate: function (format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Format a number, with leading zero if necessary
			formatNumber = function(match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num;
					}
				}
				return num;
			},
			// Format a name, short or long as requested
			formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			},
			output = "",
			literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							output += formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;
						case "M":
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							output += (lookAhead("y") ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							break;
						case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var iFormat,
			chars = "",
			literal = false,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d": case "m": case "y": case "@":
						chars += "0123456789";
						break;
					case "D": case "M":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}

		var dateFormat = this._get(inst, "dateFormat"),
			dates = inst.lastVal = inst.input ? inst.input.val() : null,
			defaultDate = this._getDefaultDate(inst),
			date = defaultDate,
			settings = this._getFormatConfig(inst);

		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			dates = (noDefault ? "" : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			},
			offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
						offset, $.datepicker._getFormatConfig(inst));
				}
				catch (e) {
					// Ignore
				}

				var date = (offset.toLowerCase().match(/^c/) ?
					$.datepicker._getDate(inst) : null) || new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate(),
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
					matches = pattern.exec(offset);

				while (matches) {
					switch (matches[2] || "d") {
						case "d" : case "D" :
							day += parseInt(matches[1],10); break;
						case "w" : case "W" :
							day += parseInt(matches[1],10) * 7; break;
						case "m" : case "M" :
							month += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y": case "Y" :
							year += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			},
			newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
				(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));

		newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */
	_daylightSavingAdjust: function(date) {
		if (!date) {
			return null;
		}
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date,
			origMonth = inst.selectedMonth,
			origYear = inst.selectedYear,
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? "" : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	_attachHandlers: function(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function () {
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function () {
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function () {
					$.datepicker._hideDatepicker();
				},
				today: function () {
					$.datepicker._gotoToday(id);
				},
				selectDay: function () {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonth: function () {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function () {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
			selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,
			tempDate = new Date(),
			today = this._daylightSavingAdjust(
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
			isRTL = this._get(inst, "isRTL"),
			showButtonPanel = this._get(inst, "showButtonPanel"),
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			numMonths = this._getNumberOfMonths(inst),
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			stepMonths = this._get(inst, "stepMonths"),
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
			currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			drawMonth = inst.drawMonth - showCurrentAtPos,
			drawYear = inst.drawYear;

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));

		prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
			" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));

		nextText = this._get(inst, "nextText");
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));

		next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
			" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));

		currentText = this._get(inst, "currentText");
		gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

		controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
			this._get(inst, "closeText") + "</button>" : "");

		buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

		firstDay = parseInt(this._get(inst, "firstDay"),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDate = this._getDefaultDate(inst);
		html = "";
		dow;
		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				cornerClass = " ui-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='ui-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0: calender += " ui-datepicker-group-first";
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
							case numMonths[1]-1: calender += " ui-datepicker-group-last";
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
							default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					"</div><table class='ui-datepicker-calendar'><thead>" +
					"<tr>";
				thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
				for (dow = 0; dow < 7; dow++) { // days of the week
					day = (dow + firstDay) % 7;
					thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += "<tr>";
					tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
						this._get(inst, "calculateWeek")(printDate) + "</td>");
					for (dow = 0; dow < 7; dow++) { // create date picker days
						daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
						otherMonth = (printDate.getMonth() !== drawMonth);
						unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += "<td class='" +
							((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
							(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + // highlight selected day
							(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
							(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
							(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
							(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
							(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day
							(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
							"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
							((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
				group += calender;
			}
			html += group;
		}
		html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {

		var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
			changeMonth = this._get(inst, "changeMonth"),
			changeYear = this._get(inst, "changeYear"),
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			html = "<div class='ui-datepicker-title'>",
			monthHtml = "";

		// month selection
		if (secondary || !changeMonth) {
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
		} else {
			inMinYear = (minDate && minDate.getFullYear() === drawYear);
			inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
			for ( month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
					monthHtml += "<option value='" + month + "'" +
						(month === drawMonth ? " selected='selected'" : "") +
						">" + monthNamesShort[month] + "</option>";
				}
			}
			monthHtml += "</select>";
		}

		if (!showMonthAfterYear) {
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
		}

		// year selection
		if ( !inst.yearshtml ) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			} else {
				// determine range of years to display
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function(value) {
					var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
				for (; year <= endYear; year++) {
					inst.yearshtml += "<option value='" + year + "'" +
						(year === drawYear ? " selected='selected'" : "") +
						">" + year + "</option>";
				}
				inst.yearshtml += "</select>";

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
		}
		html += "</div>"; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period === "Y" ? offset : 0),
			month = inst.drawMonth + (period === "M" ? offset : 0),
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
			date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			newDate = (minDate && date < minDate ? minDate : date);
		return (maxDate && newDate > maxDate ? maxDate : newDate);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
			date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		}
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var yearSplit, currentYear,
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			minYear = null,
			maxYear = null,
			years = this._get(inst, "yearRange");
			if (years){
				yearSplit = years.split(":");
				currentYear = new Date().getFullYear();
				minYear = parseInt(yearSplit[0], 10);
				maxYear = parseInt(yearSplit[1], 10);
				if ( yearSplit[0].match(/[+\-].*/) ) {
					minYear += currentYear;
				}
				if ( yearSplit[1].match(/[+\-].*/) ) {
					maxYear += currentYear;
				}
			}

		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()) &&
			(!minYear || date.getFullYear() >= minYear) &&
			(!maxYear || date.getFullYear() <= maxYear));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day === "object" ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function datepicker_bindHover(dpDiv) {
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
	return dpDiv.delegate(selector, "mouseout", function() {
			$(this).removeClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).removeClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).removeClass("ui-datepicker-next-hover");
			}
		})
		.delegate( selector, "mouseover", datepicker_handleMouseover );
}

function datepicker_handleMouseover() {
	if (!$.datepicker._isDisabledDatepicker( datepicker_instActive.inline? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
		$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
		$(this).addClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).addClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).addClass("ui-datepicker-next-hover");
		}
	}
}

/* jQuery extend now ignores nulls! */
function datepicker_extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}

	/* Append datepicker main container to body if not exist. */
	if ($("#"+$.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		typeof options === "string" ?
			$.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.11.4";

var datepicker = $.datepicker;


/*!
 * jQuery UI Dialog 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/dialog/
 */


var dialog = $.widget( "ui.dialog", {
	version: "1.11.4",
	options: {
		appendTo: "body",
		autoOpen: true,
		buttons: [],
		closeOnEscape: true,
		closeText: "Close",
		dialogClass: "",
		draggable: true,
		hide: null,
		height: "auto",
		maxHeight: null,
		maxWidth: null,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: {
			my: "center",
			at: "center",
			of: window,
			collision: "fit",
			// Ensure the titlebar is always visible
			using: function( pos ) {
				var topOffset = $( this ).css( pos ).offset().top;
				if ( topOffset < 0 ) {
					$( this ).css( "top", pos.top - topOffset );
				}
			}
		},
		resizable: true,
		show: null,
		title: null,
		width: 300,

		// callbacks
		beforeClose: null,
		close: null,
		drag: null,
		dragStart: null,
		dragStop: null,
		focus: null,
		open: null,
		resize: null,
		resizeStart: null,
		resizeStop: null
	},

	sizeRelatedOptions: {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},

	resizableRelatedOptions: {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},

	_create: function() {
		this.originalCss = {
			display: this.element[ 0 ].style.display,
			width: this.element[ 0 ].style.width,
			minHeight: this.element[ 0 ].style.minHeight,
			maxHeight: this.element[ 0 ].style.maxHeight,
			height: this.element[ 0 ].style.height
		};
		this.originalPosition = {
			parent: this.element.parent(),
			index: this.element.parent().children().index( this.element )
		};
		this.originalTitle = this.element.attr( "title" );
		this.options.title = this.options.title || this.originalTitle;

		this._createWrapper();

		this.element
			.show()
			.removeAttr( "title" )
			.addClass( "ui-dialog-content ui-widget-content" )
			.appendTo( this.uiDialog );

		this._createTitlebar();
		this._createButtonPane();

		if ( this.options.draggable && $.fn.draggable ) {
			this._makeDraggable();
		}
		if ( this.options.resizable && $.fn.resizable ) {
			this._makeResizable();
		}

		this._isOpen = false;

		this._trackFocus();
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	_appendTo: function() {
		var element = this.options.appendTo;
		if ( element && (element.jquery || element.nodeType) ) {
			return $( element );
		}
		return this.document.find( element || "body" ).eq( 0 );
	},

	_destroy: function() {
		var next,
			originalPosition = this.originalPosition;

		this._untrackInstance();
		this._destroyOverlay();

		this.element
			.removeUniqueId()
			.removeClass( "ui-dialog-content ui-widget-content" )
			.css( this.originalCss )
			// Without detaching first, the following becomes really slow
			.detach();

		this.uiDialog.stop( true, true ).remove();

		if ( this.originalTitle ) {
			this.element.attr( "title", this.originalTitle );
		}

		next = originalPosition.parent.children().eq( originalPosition.index );
		// Don't try to place the dialog next to itself (#8613)
		if ( next.length && next[ 0 ] !== this.element[ 0 ] ) {
			next.before( this.element );
		} else {
			originalPosition.parent.append( this.element );
		}
	},

	widget: function() {
		return this.uiDialog;
	},

	disable: $.noop,
	enable: $.noop,

	close: function( event ) {
		var activeElement,
			that = this;

		if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {
			return;
		}

		this._isOpen = false;
		this._focusedElement = null;
		this._destroyOverlay();
		this._untrackInstance();

		if ( !this.opener.filter( ":focusable" ).focus().length ) {

			// support: IE9
			// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
			try {
				activeElement = this.document[ 0 ].activeElement;

				// Support: IE9, IE10
				// If the <body> is blurred, IE will switch windows, see #4520
				if ( activeElement && activeElement.nodeName.toLowerCase() !== "body" ) {

					// Hiding a focused element doesn't trigger blur in WebKit
					// so in case we have nothing to focus on, explicitly blur the active element
					// https://bugs.webkit.org/show_bug.cgi?id=47182
					$( activeElement ).blur();
				}
			} catch ( error ) {}
		}

		this._hide( this.uiDialog, this.options.hide, function() {
			that._trigger( "close", event );
		});
	},

	isOpen: function() {
		return this._isOpen;
	},

	moveToTop: function() {
		this._moveToTop();
	},

	_moveToTop: function( event, silent ) {
		var moved = false,
			zIndices = this.uiDialog.siblings( ".ui-front:visible" ).map(function() {
				return +$( this ).css( "z-index" );
			}).get(),
			zIndexMax = Math.max.apply( null, zIndices );

		if ( zIndexMax >= +this.uiDialog.css( "z-index" ) ) {
			this.uiDialog.css( "z-index", zIndexMax + 1 );
			moved = true;
		}

		if ( moved && !silent ) {
			this._trigger( "focus", event );
		}
		return moved;
	},

	open: function() {
		var that = this;
		if ( this._isOpen ) {
			if ( this._moveToTop() ) {
				this._focusTabbable();
			}
			return;
		}

		this._isOpen = true;
		this.opener = $( this.document[ 0 ].activeElement );

		this._size();
		this._position();
		this._createOverlay();
		this._moveToTop( null, true );

		// Ensure the overlay is moved to the top with the dialog, but only when
		// opening. The overlay shouldn't move after the dialog is open so that
		// modeless dialogs opened after the modal dialog stack properly.
		if ( this.overlay ) {
			this.overlay.css( "z-index", this.uiDialog.css( "z-index" ) - 1 );
		}

		this._show( this.uiDialog, this.options.show, function() {
			that._focusTabbable();
			that._trigger( "focus" );
		});

		// Track the dialog immediately upon openening in case a focus event
		// somehow occurs outside of the dialog before an element inside the
		// dialog is focused (#10152)
		this._makeFocusTarget();

		this._trigger( "open" );
	},

	_focusTabbable: function() {
		// Set focus to the first match:
		// 1. An element that was focused previously
		// 2. First element inside the dialog matching [autofocus]
		// 3. Tabbable element inside the content element
		// 4. Tabbable element inside the buttonpane
		// 5. The close button
		// 6. The dialog itself
		var hasFocus = this._focusedElement;
		if ( !hasFocus ) {
			hasFocus = this.element.find( "[autofocus]" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.element.find( ":tabbable" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialogTitlebarClose.filter( ":tabbable" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialog;
		}
		hasFocus.eq( 0 ).focus();
	},

	_keepFocus: function( event ) {
		function checkFocus() {
			var activeElement = this.document[0].activeElement,
				isActive = this.uiDialog[0] === activeElement ||
					$.contains( this.uiDialog[0], activeElement );
			if ( !isActive ) {
				this._focusTabbable();
			}
		}
		event.preventDefault();
		checkFocus.call( this );
		// support: IE
		// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
		// so we check again later
		this._delay( checkFocus );
	},

	_createWrapper: function() {
		this.uiDialog = $("<div>")
			.addClass( "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
				this.options.dialogClass )
			.hide()
			.attr({
				// Setting tabIndex makes the div focusable
				tabIndex: -1,
				role: "dialog"
			})
			.appendTo( this._appendTo() );

		this._on( this.uiDialog, {
			keydown: function( event ) {
				if ( this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE ) {
					event.preventDefault();
					this.close( event );
					return;
				}

				// prevent tabbing out of dialogs
				if ( event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented() ) {
					return;
				}
				var tabbables = this.uiDialog.find( ":tabbable" ),
					first = tabbables.filter( ":first" ),
					last = tabbables.filter( ":last" );

				if ( ( event.target === last[0] || event.target === this.uiDialog[0] ) && !event.shiftKey ) {
					this._delay(function() {
						first.focus();
					});
					event.preventDefault();
				} else if ( ( event.target === first[0] || event.target === this.uiDialog[0] ) && event.shiftKey ) {
					this._delay(function() {
						last.focus();
					});
					event.preventDefault();
				}
			},
			mousedown: function( event ) {
				if ( this._moveToTop( event ) ) {
					this._focusTabbable();
				}
			}
		});

		// We assume that any existing aria-describedby attribute means
		// that the dialog content is marked up properly
		// otherwise we brute force the content as the description
		if ( !this.element.find( "[aria-describedby]" ).length ) {
			this.uiDialog.attr({
				"aria-describedby": this.element.uniqueId().attr( "id" )
			});
		}
	},

	_createTitlebar: function() {
		var uiDialogTitle;

		this.uiDialogTitlebar = $( "<div>" )
			.addClass( "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" )
			.prependTo( this.uiDialog );
		this._on( this.uiDialogTitlebar, {
			mousedown: function( event ) {
				// Don't prevent click on close button (#8838)
				// Focusing a dialog that is partially scrolled out of view
				// causes the browser to scroll it into view, preventing the click event
				if ( !$( event.target ).closest( ".ui-dialog-titlebar-close" ) ) {
					// Dialog isn't getting focus when dragging (#8063)
					this.uiDialog.focus();
				}
			}
		});

		// support: IE
		// Use type="button" to prevent enter keypresses in textboxes from closing the
		// dialog in IE (#9312)
		this.uiDialogTitlebarClose = $( "<button type='button'></button>" )
			.button({
				label: this.options.closeText,
				icons: {
					primary: "ui-icon-closethick"
				},
				text: false
			})
			.addClass( "ui-dialog-titlebar-close" )
			.appendTo( this.uiDialogTitlebar );
		this._on( this.uiDialogTitlebarClose, {
			click: function( event ) {
				event.preventDefault();
				this.close( event );
			}
		});

		uiDialogTitle = $( "<span>" )
			.uniqueId()
			.addClass( "ui-dialog-title" )
			.prependTo( this.uiDialogTitlebar );
		this._title( uiDialogTitle );

		this.uiDialog.attr({
			"aria-labelledby": uiDialogTitle.attr( "id" )
		});
	},

	_title: function( title ) {
		if ( !this.options.title ) {
			title.html( "&#160;" );
		}
		title.text( this.options.title );
	},

	_createButtonPane: function() {
		this.uiDialogButtonPane = $( "<div>" )
			.addClass( "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" );

		this.uiButtonSet = $( "<div>" )
			.addClass( "ui-dialog-buttonset" )
			.appendTo( this.uiDialogButtonPane );

		this._createButtons();
	},

	_createButtons: function() {
		var that = this,
			buttons = this.options.buttons;

		// if we already have a button pane, remove it
		this.uiDialogButtonPane.remove();
		this.uiButtonSet.empty();

		if ( $.isEmptyObject( buttons ) || ($.isArray( buttons ) && !buttons.length) ) {
			this.uiDialog.removeClass( "ui-dialog-buttons" );
			return;
		}

		$.each( buttons, function( name, props ) {
			var click, buttonOptions;
			props = $.isFunction( props ) ?
				{ click: props, text: name } :
				props;
			// Default to a non-submitting button
			props = $.extend( { type: "button" }, props );
			// Change the context for the click callback to be the main element
			click = props.click;
			props.click = function() {
				click.apply( that.element[ 0 ], arguments );
			};
			buttonOptions = {
				icons: props.icons,
				text: props.showText
			};
			delete props.icons;
			delete props.showText;
			$( "<button></button>", props )
				.button( buttonOptions )
				.appendTo( that.uiButtonSet );
		});
		this.uiDialog.addClass( "ui-dialog-buttons" );
		this.uiDialogButtonPane.appendTo( this.uiDialog );
	},

	_makeDraggable: function() {
		var that = this,
			options = this.options;

		function filteredUi( ui ) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		this.uiDialog.draggable({
			cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
			handle: ".ui-dialog-titlebar",
			containment: "document",
			start: function( event, ui ) {
				$( this ).addClass( "ui-dialog-dragging" );
				that._blockFrames();
				that._trigger( "dragStart", event, filteredUi( ui ) );
			},
			drag: function( event, ui ) {
				that._trigger( "drag", event, filteredUi( ui ) );
			},
			stop: function( event, ui ) {
				var left = ui.offset.left - that.document.scrollLeft(),
					top = ui.offset.top - that.document.scrollTop();

				options.position = {
					my: "left top",
					at: "left" + (left >= 0 ? "+" : "") + left + " " +
						"top" + (top >= 0 ? "+" : "") + top,
					of: that.window
				};
				$( this ).removeClass( "ui-dialog-dragging" );
				that._unblockFrames();
				that._trigger( "dragStop", event, filteredUi( ui ) );
			}
		});
	},

	_makeResizable: function() {
		var that = this,
			options = this.options,
			handles = options.resizable,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = this.uiDialog.css("position"),
			resizeHandles = typeof handles === "string" ?
				handles	:
				"n,e,s,w,se,sw,ne,nw";

		function filteredUi( ui ) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}

		this.uiDialog.resizable({
			cancel: ".ui-dialog-content",
			containment: "document",
			alsoResize: this.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: this._minHeight(),
			handles: resizeHandles,
			start: function( event, ui ) {
				$( this ).addClass( "ui-dialog-resizing" );
				that._blockFrames();
				that._trigger( "resizeStart", event, filteredUi( ui ) );
			},
			resize: function( event, ui ) {
				that._trigger( "resize", event, filteredUi( ui ) );
			},
			stop: function( event, ui ) {
				var offset = that.uiDialog.offset(),
					left = offset.left - that.document.scrollLeft(),
					top = offset.top - that.document.scrollTop();

				options.height = that.uiDialog.height();
				options.width = that.uiDialog.width();
				options.position = {
					my: "left top",
					at: "left" + (left >= 0 ? "+" : "") + left + " " +
						"top" + (top >= 0 ? "+" : "") + top,
					of: that.window
				};
				$( this ).removeClass( "ui-dialog-resizing" );
				that._unblockFrames();
				that._trigger( "resizeStop", event, filteredUi( ui ) );
			}
		})
		.css( "position", position );
	},

	_trackFocus: function() {
		this._on( this.widget(), {
			focusin: function( event ) {
				this._makeFocusTarget();
				this._focusedElement = $( event.target );
			}
		});
	},

	_makeFocusTarget: function() {
		this._untrackInstance();
		this._trackingInstances().unshift( this );
	},

	_untrackInstance: function() {
		var instances = this._trackingInstances(),
			exists = $.inArray( this, instances );
		if ( exists !== -1 ) {
			instances.splice( exists, 1 );
		}
	},

	_trackingInstances: function() {
		var instances = this.document.data( "ui-dialog-instances" );
		if ( !instances ) {
			instances = [];
			this.document.data( "ui-dialog-instances", instances );
		}
		return instances;
	},

	_minHeight: function() {
		var options = this.options;

		return options.height === "auto" ?
			options.minHeight :
			Math.min( options.minHeight, options.height );
	},

	_position: function() {
		// Need to show the dialog to get the actual offset in the position plugin
		var isVisible = this.uiDialog.is( ":visible" );
		if ( !isVisible ) {
			this.uiDialog.show();
		}
		this.uiDialog.position( this.options.position );
		if ( !isVisible ) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var that = this,
			resize = false,
			resizableOptions = {};

		$.each( options, function( key, value ) {
			that._setOption( key, value );

			if ( key in that.sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in that.resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
			this._position();
		}
		if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function( key, value ) {
		var isDraggable, isResizable,
			uiDialog = this.uiDialog;

		if ( key === "dialogClass" ) {
			uiDialog
				.removeClass( this.options.dialogClass )
				.addClass( value );
		}

		if ( key === "disabled" ) {
			return;
		}

		this._super( key, value );

		if ( key === "appendTo" ) {
			this.uiDialog.appendTo( this._appendTo() );
		}

		if ( key === "buttons" ) {
			this._createButtons();
		}

		if ( key === "closeText" ) {
			this.uiDialogTitlebarClose.button({
				// Ensure that we always pass a string
				label: "" + value
			});
		}

		if ( key === "draggable" ) {
			isDraggable = uiDialog.is( ":data(ui-draggable)" );
			if ( isDraggable && !value ) {
				uiDialog.draggable( "destroy" );
			}

			if ( !isDraggable && value ) {
				this._makeDraggable();
			}
		}

		if ( key === "position" ) {
			this._position();
		}

		if ( key === "resizable" ) {
			// currently resizable, becoming non-resizable
			isResizable = uiDialog.is( ":data(ui-resizable)" );
			if ( isResizable && !value ) {
				uiDialog.resizable( "destroy" );
			}

			// currently resizable, changing handles
			if ( isResizable && typeof value === "string" ) {
				uiDialog.resizable( "option", "handles", value );
			}

			// currently non-resizable, becoming resizable
			if ( !isResizable && value !== false ) {
				this._makeResizable();
			}
		}

		if ( key === "title" ) {
			this._title( this.uiDialogTitlebar.find( ".ui-dialog-title" ) );
		}
	},

	_size: function() {
		// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		// divs will both have width and height set, so we need to reset them
		var nonContentHeight, minContentHeight, maxContentHeight,
			options = this.options;

		// Reset content sizing
		this.element.show().css({
			width: "auto",
			minHeight: 0,
			maxHeight: "none",
			height: 0
		});

		if ( options.minWidth > options.width ) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: "auto",
				width: options.width
			})
			.outerHeight();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
		maxContentHeight = typeof options.maxHeight === "number" ?
			Math.max( 0, options.maxHeight - nonContentHeight ) :
			"none";

		if ( options.height === "auto" ) {
			this.element.css({
				minHeight: minContentHeight,
				maxHeight: maxContentHeight,
				height: "auto"
			});
		} else {
			this.element.height( Math.max( 0, options.height - nonContentHeight ) );
		}

		if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
			this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
		}
	},

	_blockFrames: function() {
		this.iframeBlocks = this.document.find( "iframe" ).map(function() {
			var iframe = $( this );

			return $( "<div>" )
				.css({
					position: "absolute",
					width: iframe.outerWidth(),
					height: iframe.outerHeight()
				})
				.appendTo( iframe.parent() )
				.offset( iframe.offset() )[0];
		});
	},

	_unblockFrames: function() {
		if ( this.iframeBlocks ) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_allowInteraction: function( event ) {
		if ( $( event.target ).closest( ".ui-dialog" ).length ) {
			return true;
		}

		// TODO: Remove hack when datepicker implements
		// the .ui-front logic (#8989)
		return !!$( event.target ).closest( ".ui-datepicker" ).length;
	},

	_createOverlay: function() {
		if ( !this.options.modal ) {
			return;
		}

		// We use a delay in case the overlay is created from an
		// event that we're going to be cancelling (#2804)
		var isOpening = true;
		this._delay(function() {
			isOpening = false;
		});

		if ( !this.document.data( "ui-dialog-overlays" ) ) {

			// Prevent use of anchors and inputs
			// Using _on() for an event handler shared across many instances is
			// safe because the dialogs stack and must be closed in reverse order
			this._on( this.document, {
				focusin: function( event ) {
					if ( isOpening ) {
						return;
					}

					if ( !this._allowInteraction( event ) ) {
						event.preventDefault();
						this._trackingInstances()[ 0 ]._focusTabbable();
					}
				}
			});
		}

		this.overlay = $( "<div>" )
			.addClass( "ui-widget-overlay ui-front" )
			.appendTo( this._appendTo() );
		this._on( this.overlay, {
			mousedown: "_keepFocus"
		});
		this.document.data( "ui-dialog-overlays",
			(this.document.data( "ui-dialog-overlays" ) || 0) + 1 );
	},

	_destroyOverlay: function() {
		if ( !this.options.modal ) {
			return;
		}

		if ( this.overlay ) {
			var overlays = this.document.data( "ui-dialog-overlays" ) - 1;

			if ( !overlays ) {
				this.document
					.unbind( "focusin" )
					.removeData( "ui-dialog-overlays" );
			} else {
				this.document.data( "ui-dialog-overlays", overlays );
			}

			this.overlay.remove();
			this.overlay = null;
		}
	}
});


/*!
 * jQuery UI Progressbar 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/progressbar/
 */


var progressbar = $.widget( "ui.progressbar", {
	version: "1.11.4",
	options: {
		max: 100,
		value: 0,

		change: null,
		complete: null
	},

	min: 0,

	_create: function() {
		// Constrain initial value
		this.oldValue = this.options.value = this._constrainedValue();

		this.element
			.addClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
			.attr({
				// Only set static values, aria-valuenow and aria-valuemax are
				// set inside _refreshValue()
				role: "progressbar",
				"aria-valuemin": this.min
			});

		this.valueDiv = $( "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>" )
			.appendTo( this.element );

		this._refreshValue();
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
			.removeAttr( "role" )
			.removeAttr( "aria-valuemin" )
			.removeAttr( "aria-valuemax" )
			.removeAttr( "aria-valuenow" );

		this.valueDiv.remove();
	},

	value: function( newValue ) {
		if ( newValue === undefined ) {
			return this.options.value;
		}

		this.options.value = this._constrainedValue( newValue );
		this._refreshValue();
	},

	_constrainedValue: function( newValue ) {
		if ( newValue === undefined ) {
			newValue = this.options.value;
		}

		this.indeterminate = newValue === false;

		// sanitize value
		if ( typeof newValue !== "number" ) {
			newValue = 0;
		}

		return this.indeterminate ? false :
			Math.min( this.options.max, Math.max( this.min, newValue ) );
	},

	_setOptions: function( options ) {
		// Ensure "value" option is set after other values (like max)
		var value = options.value;
		delete options.value;

		this._super( options );

		this.options.value = this._constrainedValue( value );
		this._refreshValue();
	},

	_setOption: function( key, value ) {
		if ( key === "max" ) {
			// Don't allow a max less than min
			value = Math.max( this.min, value );
		}
		if ( key === "disabled" ) {
			this.element
				.toggleClass( "ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
		}
		this._super( key, value );
	},

	_percentage: function() {
		return this.indeterminate ? 100 : 100 * ( this.options.value - this.min ) / ( this.options.max - this.min );
	},

	_refreshValue: function() {
		var value = this.options.value,
			percentage = this._percentage();

		this.valueDiv
			.toggle( this.indeterminate || value > this.min )
			.toggleClass( "ui-corner-right", value === this.options.max )
			.width( percentage.toFixed(0) + "%" );

		this.element.toggleClass( "ui-progressbar-indeterminate", this.indeterminate );

		if ( this.indeterminate ) {
			this.element.removeAttr( "aria-valuenow" );
			if ( !this.overlayDiv ) {
				this.overlayDiv = $( "<div class='ui-progressbar-overlay'></div>" ).appendTo( this.valueDiv );
			}
		} else {
			this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": value
			});
			if ( this.overlayDiv ) {
				this.overlayDiv.remove();
				this.overlayDiv = null;
			}
		}

		if ( this.oldValue !== value ) {
			this.oldValue = value;
			this._trigger( "change" );
		}
		if ( value === this.options.max ) {
			this._trigger( "complete" );
		}
	}
});


/*!
 * jQuery UI Selectmenu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectmenu
 */


var selectmenu = $.widget( "ui.selectmenu", {
	version: "1.11.4",
	defaultElement: "<select>",
	options: {
		appendTo: null,
		disabled: null,
		icons: {
			button: "ui-icon-triangle-1-s"
		},
		position: {
			my: "left top",
			at: "left bottom",
			collision: "none"
		},
		width: null,

		// callbacks
		change: null,
		close: null,
		focus: null,
		open: null,
		select: null
	},

	_create: function() {
		var selectmenuId = this.element.uniqueId().attr( "id" );
		this.ids = {
			element: selectmenuId,
			button: selectmenuId + "-button",
			menu: selectmenuId + "-menu"
		};

		this._drawButton();
		this._drawMenu();

		if ( this.options.disabled ) {
			this.disable();
		}
	},

	_drawButton: function() {
		var that = this;

		// Associate existing label with the new button
		this.label = $( "label[for='" + this.ids.element + "']" ).attr( "for", this.ids.button );
		this._on( this.label, {
			click: function( event ) {
				this.button.focus();
				event.preventDefault();
			}
		});

		// Hide original select element
		this.element.hide();

		// Create button
		this.button = $( "<span>", {
			"class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
			tabindex: this.options.disabled ? -1 : 0,
			id: this.ids.button,
			role: "combobox",
			"aria-expanded": "false",
			"aria-autocomplete": "list",
			"aria-owns": this.ids.menu,
			"aria-haspopup": "true"
		})
			.insertAfter( this.element );

		$( "<span>", {
			"class": "ui-icon " + this.options.icons.button
		})
			.prependTo( this.button );

		this.buttonText = $( "<span>", {
			"class": "ui-selectmenu-text"
		})
			.appendTo( this.button );

		this._setText( this.buttonText, this.element.find( "option:selected" ).text() );
		this._resizeButton();

		this._on( this.button, this._buttonEvents );
		this.button.one( "focusin", function() {

			// Delay rendering the menu items until the button receives focus.
			// The menu may have already been rendered via a programmatic open.
			if ( !that.menuItems ) {
				that._refreshMenu();
			}
		});
		this._hoverable( this.button );
		this._focusable( this.button );
	},

	_drawMenu: function() {
		var that = this;

		// Create menu
		this.menu = $( "<ul>", {
			"aria-hidden": "true",
			"aria-labelledby": this.ids.button,
			id: this.ids.menu
		});

		// Wrap menu
		this.menuWrap = $( "<div>", {
			"class": "ui-selectmenu-menu ui-front"
		})
			.append( this.menu )
			.appendTo( this._appendTo() );

		// Initialize menu widget
		this.menuInstance = this.menu
			.menu({
				role: "listbox",
				select: function( event, ui ) {
					event.preventDefault();

					// support: IE8
					// If the item was selected via a click, the text selection
					// will be destroyed in IE
					that._setSelection();

					that._select( ui.item.data( "ui-selectmenu-item" ), event );
				},
				focus: function( event, ui ) {
					var item = ui.item.data( "ui-selectmenu-item" );

					// Prevent inital focus from firing and check if its a newly focused item
					if ( that.focusIndex != null && item.index !== that.focusIndex ) {
						that._trigger( "focus", event, { item: item } );
						if ( !that.isOpen ) {
							that._select( item, event );
						}
					}
					that.focusIndex = item.index;

					that.button.attr( "aria-activedescendant",
						that.menuItems.eq( item.index ).attr( "id" ) );
				}
			})
			.menu( "instance" );

		// Adjust menu styles to dropdown
		this.menu
			.addClass( "ui-corner-bottom" )
			.removeClass( "ui-corner-all" );

		// Don't close the menu on mouseleave
		this.menuInstance._off( this.menu, "mouseleave" );

		// Cancel the menu's collapseAll on document click
		this.menuInstance._closeOnDocumentClick = function() {
			return false;
		};

		// Selects often contain empty items, but never contain dividers
		this.menuInstance._isDivider = function() {
			return false;
		};
	},

	refresh: function() {
		this._refreshMenu();
		this._setText( this.buttonText, this._getSelectedItem().text() );
		if ( !this.options.width ) {
			this._resizeButton();
		}
	},

	_refreshMenu: function() {
		this.menu.empty();

		var item,
			options = this.element.find( "option" );

		if ( !options.length ) {
			return;
		}

		this._parseOptions( options );
		this._renderMenu( this.menu, this.items );

		this.menuInstance.refresh();
		this.menuItems = this.menu.find( "li" ).not( ".ui-selectmenu-optgroup" );

		item = this._getSelectedItem();

		// Update the menu to have the correct item focused
		this.menuInstance.focus( null, item );
		this._setAria( item.data( "ui-selectmenu-item" ) );

		// Set disabled state
		this._setOption( "disabled", this.element.prop( "disabled" ) );
	},

	open: function( event ) {
		if ( this.options.disabled ) {
			return;
		}

		// If this is the first time the menu is being opened, render the items
		if ( !this.menuItems ) {
			this._refreshMenu();
		} else {

			// Menu clears focus on close, reset focus to selected item
			this.menu.find( ".ui-state-focus" ).removeClass( "ui-state-focus" );
			this.menuInstance.focus( null, this._getSelectedItem() );
		}

		this.isOpen = true;
		this._toggleAttr();
		this._resizeMenu();
		this._position();

		this._on( this.document, this._documentClick );

		this._trigger( "open", event );
	},

	_position: function() {
		this.menuWrap.position( $.extend( { of: this.button }, this.options.position ) );
	},

	close: function( event ) {
		if ( !this.isOpen ) {
			return;
		}

		this.isOpen = false;
		this._toggleAttr();

		this.range = null;
		this._off( this.document );

		this._trigger( "close", event );
	},

	widget: function() {
		return this.button;
	},

	menuWidget: function() {
		return this.menu;
	},

	_renderMenu: function( ul, items ) {
		var that = this,
			currentOptgroup = "";

		$.each( items, function( index, item ) {
			if ( item.optgroup !== currentOptgroup ) {
				$( "<li>", {
					"class": "ui-selectmenu-optgroup ui-menu-divider" +
						( item.element.parent( "optgroup" ).prop( "disabled" ) ?
							" ui-state-disabled" :
							"" ),
					text: item.optgroup
				})
					.appendTo( ul );

				currentOptgroup = item.optgroup;
			}

			that._renderItemData( ul, item );
		});
	},

	_renderItemData: function( ul, item ) {
		return this._renderItem( ul, item ).data( "ui-selectmenu-item", item );
	},

	_renderItem: function( ul, item ) {
		var li = $( "<li>" );

		if ( item.disabled ) {
			li.addClass( "ui-state-disabled" );
		}
		this._setText( li, item.label );

		return li.appendTo( ul );
	},

	_setText: function( element, value ) {
		if ( value ) {
			element.text( value );
		} else {
			element.html( "&#160;" );
		}
	},

	_move: function( direction, event ) {
		var item, next,
			filter = ".ui-menu-item";

		if ( this.isOpen ) {
			item = this.menuItems.eq( this.focusIndex );
		} else {
			item = this.menuItems.eq( this.element[ 0 ].selectedIndex );
			filter += ":not(.ui-state-disabled)";
		}

		if ( direction === "first" || direction === "last" ) {
			next = item[ direction === "first" ? "prevAll" : "nextAll" ]( filter ).eq( -1 );
		} else {
			next = item[ direction + "All" ]( filter ).eq( 0 );
		}

		if ( next.length ) {
			this.menuInstance.focus( event, next );
		}
	},

	_getSelectedItem: function() {
		return this.menuItems.eq( this.element[ 0 ].selectedIndex );
	},

	_toggle: function( event ) {
		this[ this.isOpen ? "close" : "open" ]( event );
	},

	_setSelection: function() {
		var selection;

		if ( !this.range ) {
			return;
		}

		if ( window.getSelection ) {
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange( this.range );

		// support: IE8
		} else {
			this.range.select();
		}

		// support: IE
		// Setting the text selection kills the button focus in IE, but
		// restoring the focus doesn't kill the selection.
		this.button.focus();
	},

	_documentClick: {
		mousedown: function( event ) {
			if ( !this.isOpen ) {
				return;
			}

			if ( !$( event.target ).closest( ".ui-selectmenu-menu, #" + this.ids.button ).length ) {
				this.close( event );
			}
		}
	},

	_buttonEvents: {

		// Prevent text selection from being reset when interacting with the selectmenu (#10144)
		mousedown: function() {
			var selection;

			if ( window.getSelection ) {
				selection = window.getSelection();
				if ( selection.rangeCount ) {
					this.range = selection.getRangeAt( 0 );
				}

			// support: IE8
			} else {
				this.range = document.selection.createRange();
			}
		},

		click: function( event ) {
			this._setSelection();
			this._toggle( event );
		},

		keydown: function( event ) {
			var preventDefault = true;
			switch ( event.keyCode ) {
				case $.ui.keyCode.TAB:
				case $.ui.keyCode.ESCAPE:
					this.close( event );
					preventDefault = false;
					break;
				case $.ui.keyCode.ENTER:
					if ( this.isOpen ) {
						this._selectFocusedItem( event );
					}
					break;
				case $.ui.keyCode.UP:
					if ( event.altKey ) {
						this._toggle( event );
					} else {
						this._move( "prev", event );
					}
					break;
				case $.ui.keyCode.DOWN:
					if ( event.altKey ) {
						this._toggle( event );
					} else {
						this._move( "next", event );
					}
					break;
				case $.ui.keyCode.SPACE:
					if ( this.isOpen ) {
						this._selectFocusedItem( event );
					} else {
						this._toggle( event );
					}
					break;
				case $.ui.keyCode.LEFT:
					this._move( "prev", event );
					break;
				case $.ui.keyCode.RIGHT:
					this._move( "next", event );
					break;
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.PAGE_UP:
					this._move( "first", event );
					break;
				case $.ui.keyCode.END:
				case $.ui.keyCode.PAGE_DOWN:
					this._move( "last", event );
					break;
				default:
					this.menu.trigger( event );
					preventDefault = false;
			}

			if ( preventDefault ) {
				event.preventDefault();
			}
		}
	},

	_selectFocusedItem: function( event ) {
		var item = this.menuItems.eq( this.focusIndex );
		if ( !item.hasClass( "ui-state-disabled" ) ) {
			this._select( item.data( "ui-selectmenu-item" ), event );
		}
	},

	_select: function( item, event ) {
		var oldIndex = this.element[ 0 ].selectedIndex;

		// Change native select element
		this.element[ 0 ].selectedIndex = item.index;
		this._setText( this.buttonText, item.label );
		this._setAria( item );
		this._trigger( "select", event, { item: item } );

		if ( item.index !== oldIndex ) {
			this._trigger( "change", event, { item: item } );
		}

		this.close( event );
	},

	_setAria: function( item ) {
		var id = this.menuItems.eq( item.index ).attr( "id" );

		this.button.attr({
			"aria-labelledby": id,
			"aria-activedescendant": id
		});
		this.menu.attr( "aria-activedescendant", id );
	},

	_setOption: function( key, value ) {
		if ( key === "icons" ) {
			this.button.find( "span.ui-icon" )
				.removeClass( this.options.icons.button )
				.addClass( value.button );
		}

		this._super( key, value );

		if ( key === "appendTo" ) {
			this.menuWrap.appendTo( this._appendTo() );
		}

		if ( key === "disabled" ) {
			this.menuInstance.option( "disabled", value );
			this.button
				.toggleClass( "ui-state-disabled", value )
				.attr( "aria-disabled", value );

			this.element.prop( "disabled", value );
			if ( value ) {
				this.button.attr( "tabindex", -1 );
				this.close();
			} else {
				this.button.attr( "tabindex", 0 );
			}
		}

		if ( key === "width" ) {
			this._resizeButton();
		}
	},

	_appendTo: function() {
		var element = this.options.appendTo;

		if ( element ) {
			element = element.jquery || element.nodeType ?
				$( element ) :
				this.document.find( element ).eq( 0 );
		}

		if ( !element || !element[ 0 ] ) {
			element = this.element.closest( ".ui-front" );
		}

		if ( !element.length ) {
			element = this.document[ 0 ].body;
		}

		return element;
	},

	_toggleAttr: function() {
		this.button
			.toggleClass( "ui-corner-top", this.isOpen )
			.toggleClass( "ui-corner-all", !this.isOpen )
			.attr( "aria-expanded", this.isOpen );
		this.menuWrap.toggleClass( "ui-selectmenu-open", this.isOpen );
		this.menu.attr( "aria-hidden", !this.isOpen );
	},

	_resizeButton: function() {
		var width = this.options.width;

		if ( !width ) {
			width = this.element.show().outerWidth();
			this.element.hide();
		}

		this.button.outerWidth( width );
	},

	_resizeMenu: function() {
		this.menu.outerWidth( Math.max(
			this.button.outerWidth(),

			// support: IE10
			// IE10 wraps long text (possibly a rounding bug)
			// so we add 1px to avoid the wrapping
			this.menu.width( "" ).outerWidth() + 1
		) );
	},

	_getCreateOptions: function() {
		return { disabled: this.element.prop( "disabled" ) };
	},

	_parseOptions: function( options ) {
		var data = [];
		options.each(function( index, item ) {
			var option = $( item ),
				optgroup = option.parent( "optgroup" );
			data.push({
				element: option,
				index: index,
				value: option.val(),
				label: option.text(),
				optgroup: optgroup.attr( "label" ) || "",
				disabled: optgroup.prop( "disabled" ) || option.prop( "disabled" )
			});
		});
		this.items = data;
	},

	_destroy: function() {
		this.menuWrap.remove();
		this.button.remove();
		this.element.show();
		this.element.removeUniqueId();
		this.label.attr( "for", this.ids.element );
	}
});


/*!
 * jQuery UI Slider 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */


var slider = $.widget( "ui.slider", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "slide",

	options: {
		animate: false,
		distance: 0,
		max: 100,
		min: 0,
		orientation: "horizontal",
		range: false,
		step: 1,
		value: 0,
		values: null,

		// callbacks
		change: null,
		slide: null,
		start: null,
		stop: null
	},

	// number of pages in a slider
	// (how many times can you page up/down to go through the whole range)
	numPages: 5,

	_create: function() {
		this._keySliding = false;
		this._mouseSliding = false;
		this._animateOff = true;
		this._handleIndex = null;
		this._detectOrientation();
		this._mouseInit();
		this._calculateNewMax();

		this.element
			.addClass( "ui-slider" +
				" ui-slider-" + this.orientation +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all");

		this._refresh();
		this._setOption( "disabled", this.options.disabled );

		this._animateOff = false;
	},

	_refresh: function() {
		this._createRange();
		this._createHandles();
		this._setupEvents();
		this._refreshValue();
	},

	_createHandles: function() {
		var i, handleCount,
			options = this.options,
			existingHandles = this.element.find( ".ui-slider-handle" ).addClass( "ui-state-default ui-corner-all" ),
			handle = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
			handles = [];

		handleCount = ( options.values && options.values.length ) || 1;

		if ( existingHandles.length > handleCount ) {
			existingHandles.slice( handleCount ).remove();
			existingHandles = existingHandles.slice( 0, handleCount );
		}

		for ( i = existingHandles.length; i < handleCount; i++ ) {
			handles.push( handle );
		}

		this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );

		this.handle = this.handles.eq( 0 );

		this.handles.each(function( i ) {
			$( this ).data( "ui-slider-handle-index", i );
		});
	},

	_createRange: function() {
		var options = this.options,
			classes = "";

		if ( options.range ) {
			if ( options.range === true ) {
				if ( !options.values ) {
					options.values = [ this._valueMin(), this._valueMin() ];
				} else if ( options.values.length && options.values.length !== 2 ) {
					options.values = [ options.values[0], options.values[0] ];
				} else if ( $.isArray( options.values ) ) {
					options.values = options.values.slice(0);
				}
			}

			if ( !this.range || !this.range.length ) {
				this.range = $( "<div></div>" )
					.appendTo( this.element );

				classes = "ui-slider-range" +
				// note: this isn't the most fittingly semantic framework class for this element,
				// but worked best visually with a variety of themes
				" ui-widget-header ui-corner-all";
			} else {
				this.range.removeClass( "ui-slider-range-min ui-slider-range-max" )
					// Handle range switching from true to min/max
					.css({
						"left": "",
						"bottom": ""
					});
			}

			this.range.addClass( classes +
				( ( options.range === "min" || options.range === "max" ) ? " ui-slider-range-" + options.range : "" ) );
		} else {
			if ( this.range ) {
				this.range.remove();
			}
			this.range = null;
		}
	},

	_setupEvents: function() {
		this._off( this.handles );
		this._on( this.handles, this._handleEvents );
		this._hoverable( this.handles );
		this._focusable( this.handles );
	},

	_destroy: function() {
		this.handles.remove();
		if ( this.range ) {
			this.range.remove();
		}

		this.element
			.removeClass( "ui-slider" +
				" ui-slider-horizontal" +
				" ui-slider-vertical" +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all" );

		this._mouseDestroy();
	},

	_mouseCapture: function( event ) {
		var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
			that = this,
			o = this.options;

		if ( o.disabled ) {
			return false;
		}

		this.elementSize = {
			width: this.element.outerWidth(),
			height: this.element.outerHeight()
		};
		this.elementOffset = this.element.offset();

		position = { x: event.pageX, y: event.pageY };
		normValue = this._normValueFromMouse( position );
		distance = this._valueMax() - this._valueMin() + 1;
		this.handles.each(function( i ) {
			var thisDistance = Math.abs( normValue - that.values(i) );
			if (( distance > thisDistance ) ||
				( distance === thisDistance &&
					(i === that._lastChangedValue || that.values(i) === o.min ))) {
				distance = thisDistance;
				closestHandle = $( this );
				index = i;
			}
		});

		allowed = this._start( event, index );
		if ( allowed === false ) {
			return false;
		}
		this._mouseSliding = true;

		this._handleIndex = index;

		closestHandle
			.addClass( "ui-state-active" )
			.focus();

		offset = closestHandle.offset();
		mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );
		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
			left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
			top: event.pageY - offset.top -
				( closestHandle.height() / 2 ) -
				( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -
				( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +
				( parseInt( closestHandle.css("marginTop"), 10 ) || 0)
		};

		if ( !this.handles.hasClass( "ui-state-hover" ) ) {
			this._slide( event, index, normValue );
		}
		this._animateOff = true;
		return true;
	},

	_mouseStart: function() {
		return true;
	},

	_mouseDrag: function( event ) {
		var position = { x: event.pageX, y: event.pageY },
			normValue = this._normValueFromMouse( position );

		this._slide( event, this._handleIndex, normValue );

		return false;
	},

	_mouseStop: function( event ) {
		this.handles.removeClass( "ui-state-active" );
		this._mouseSliding = false;

		this._stop( event, this._handleIndex );
		this._change( event, this._handleIndex );

		this._handleIndex = null;
		this._clickOffset = null;
		this._animateOff = false;

		return false;
	},

	_detectOrientation: function() {
		this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";
	},

	_normValueFromMouse: function( position ) {
		var pixelTotal,
			pixelMouse,
			percentMouse,
			valueTotal,
			valueMouse;

		if ( this.orientation === "horizontal" ) {
			pixelTotal = this.elementSize.width;
			pixelMouse = position.x - this.elementOffset.left - ( this._clickOffset ? this._clickOffset.left : 0 );
		} else {
			pixelTotal = this.elementSize.height;
			pixelMouse = position.y - this.elementOffset.top - ( this._clickOffset ? this._clickOffset.top : 0 );
		}

		percentMouse = ( pixelMouse / pixelTotal );
		if ( percentMouse > 1 ) {
			percentMouse = 1;
		}
		if ( percentMouse < 0 ) {
			percentMouse = 0;
		}
		if ( this.orientation === "vertical" ) {
			percentMouse = 1 - percentMouse;
		}

		valueTotal = this._valueMax() - this._valueMin();
		valueMouse = this._valueMin() + percentMouse * valueTotal;

		return this._trimAlignValue( valueMouse );
	},

	_start: function( event, index ) {
		var uiHash = {
			handle: this.handles[ index ],
			value: this.value()
		};
		if ( this.options.values && this.options.values.length ) {
			uiHash.value = this.values( index );
			uiHash.values = this.values();
		}
		return this._trigger( "start", event, uiHash );
	},

	_slide: function( event, index, newVal ) {
		var otherVal,
			newValues,
			allowed;

		if ( this.options.values && this.options.values.length ) {
			otherVal = this.values( index ? 0 : 1 );

			if ( ( this.options.values.length === 2 && this.options.range === true ) &&
					( ( index === 0 && newVal > otherVal) || ( index === 1 && newVal < otherVal ) )
				) {
				newVal = otherVal;
			}

			if ( newVal !== this.values( index ) ) {
				newValues = this.values();
				newValues[ index ] = newVal;
				// A slide can be canceled by returning false from the slide callback
				allowed = this._trigger( "slide", event, {
					handle: this.handles[ index ],
					value: newVal,
					values: newValues
				} );
				otherVal = this.values( index ? 0 : 1 );
				if ( allowed !== false ) {
					this.values( index, newVal );
				}
			}
		} else {
			if ( newVal !== this.value() ) {
				// A slide can be canceled by returning false from the slide callback
				allowed = this._trigger( "slide", event, {
					handle: this.handles[ index ],
					value: newVal
				} );
				if ( allowed !== false ) {
					this.value( newVal );
				}
			}
		}
	},

	_stop: function( event, index ) {
		var uiHash = {
			handle: this.handles[ index ],
			value: this.value()
		};
		if ( this.options.values && this.options.values.length ) {
			uiHash.value = this.values( index );
			uiHash.values = this.values();
		}

		this._trigger( "stop", event, uiHash );
	},

	_change: function( event, index ) {
		if ( !this._keySliding && !this._mouseSliding ) {
			var uiHash = {
				handle: this.handles[ index ],
				value: this.value()
			};
			if ( this.options.values && this.options.values.length ) {
				uiHash.value = this.values( index );
				uiHash.values = this.values();
			}

			//store the last changed value index for reference when handles overlap
			this._lastChangedValue = index;

			this._trigger( "change", event, uiHash );
		}
	},

	value: function( newValue ) {
		if ( arguments.length ) {
			this.options.value = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, 0 );
			return;
		}

		return this._value();
	},

	values: function( index, newValue ) {
		var vals,
			newValues,
			i;

		if ( arguments.length > 1 ) {
			this.options.values[ index ] = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, index );
			return;
		}

		if ( arguments.length ) {
			if ( $.isArray( arguments[ 0 ] ) ) {
				vals = this.options.values;
				newValues = arguments[ 0 ];
				for ( i = 0; i < vals.length; i += 1 ) {
					vals[ i ] = this._trimAlignValue( newValues[ i ] );
					this._change( null, i );
				}
				this._refreshValue();
			} else {
				if ( this.options.values && this.options.values.length ) {
					return this._values( index );
				} else {
					return this.value();
				}
			}
		} else {
			return this._values();
		}
	},

	_setOption: function( key, value ) {
		var i,
			valsLength = 0;

		if ( key === "range" && this.options.range === true ) {
			if ( value === "min" ) {
				this.options.value = this._values( 0 );
				this.options.values = null;
			} else if ( value === "max" ) {
				this.options.value = this._values( this.options.values.length - 1 );
				this.options.values = null;
			}
		}

		if ( $.isArray( this.options.values ) ) {
			valsLength = this.options.values.length;
		}

		if ( key === "disabled" ) {
			this.element.toggleClass( "ui-state-disabled", !!value );
		}

		this._super( key, value );

		switch ( key ) {
			case "orientation":
				this._detectOrientation();
				this.element
					.removeClass( "ui-slider-horizontal ui-slider-vertical" )
					.addClass( "ui-slider-" + this.orientation );
				this._refreshValue();

				// Reset positioning from previous orientation
				this.handles.css( value === "horizontal" ? "bottom" : "left", "" );
				break;
			case "value":
				this._animateOff = true;
				this._refreshValue();
				this._change( null, 0 );
				this._animateOff = false;
				break;
			case "values":
				this._animateOff = true;
				this._refreshValue();
				for ( i = 0; i < valsLength; i += 1 ) {
					this._change( null, i );
				}
				this._animateOff = false;
				break;
			case "step":
			case "min":
			case "max":
				this._animateOff = true;
				this._calculateNewMax();
				this._refreshValue();
				this._animateOff = false;
				break;
			case "range":
				this._animateOff = true;
				this._refresh();
				this._animateOff = false;
				break;
		}
	},

	//internal value getter
	// _value() returns value trimmed by min and max, aligned by step
	_value: function() {
		var val = this.options.value;
		val = this._trimAlignValue( val );

		return val;
	},

	//internal values getter
	// _values() returns array of values trimmed by min and max, aligned by step
	// _values( index ) returns single value trimmed by min and max, aligned by step
	_values: function( index ) {
		var val,
			vals,
			i;

		if ( arguments.length ) {
			val = this.options.values[ index ];
			val = this._trimAlignValue( val );

			return val;
		} else if ( this.options.values && this.options.values.length ) {
			// .slice() creates a copy of the array
			// this copy gets trimmed by min and max and then returned
			vals = this.options.values.slice();
			for ( i = 0; i < vals.length; i += 1) {
				vals[ i ] = this._trimAlignValue( vals[ i ] );
			}

			return vals;
		} else {
			return [];
		}
	},

	// returns the step-aligned value that val is closest to, between (inclusive) min and max
	_trimAlignValue: function( val ) {
		if ( val <= this._valueMin() ) {
			return this._valueMin();
		}
		if ( val >= this._valueMax() ) {
			return this._valueMax();
		}
		var step = ( this.options.step > 0 ) ? this.options.step : 1,
			valModStep = (val - this._valueMin()) % step,
			alignValue = val - valModStep;

		if ( Math.abs(valModStep) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see #4124)
		return parseFloat( alignValue.toFixed(5) );
	},

	_calculateNewMax: function() {
		var max = this.options.max,
			min = this._valueMin(),
			step = this.options.step,
			aboveMin = Math.floor( ( +( max - min ).toFixed( this._precision() ) ) / step ) * step;
		max = aboveMin + min;
		this.max = parseFloat( max.toFixed( this._precision() ) );
	},

	_precision: function() {
		var precision = this._precisionOf( this.options.step );
		if ( this.options.min !== null ) {
			precision = Math.max( precision, this._precisionOf( this.options.min ) );
		}
		return precision;
	},

	_precisionOf: function( num ) {
		var str = num.toString(),
			decimal = str.indexOf( "." );
		return decimal === -1 ? 0 : str.length - decimal - 1;
	},

	_valueMin: function() {
		return this.options.min;
	},

	_valueMax: function() {
		return this.max;
	},

	_refreshValue: function() {
		var lastValPercent, valPercent, value, valueMin, valueMax,
			oRange = this.options.range,
			o = this.options,
			that = this,
			animate = ( !this._animateOff ) ? o.animate : false,
			_set = {};

		if ( this.options.values && this.options.values.length ) {
			this.handles.each(function( i ) {
				valPercent = ( that.values(i) - that._valueMin() ) / ( that._valueMax() - that._valueMin() ) * 100;
				_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
				if ( that.options.range === true ) {
					if ( that.orientation === "horizontal" ) {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
						}
					} else {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
						}
					}
				}
				lastValPercent = valPercent;
			});
		} else {
			value = this.value();
			valueMin = this._valueMin();
			valueMax = this._valueMax();
			valPercent = ( valueMax !== valueMin ) ?
					( value - valueMin ) / ( valueMax - valueMin ) * 100 :
					0;
			_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
			this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

			if ( oRange === "min" && this.orientation === "horizontal" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );
			}
			if ( oRange === "max" && this.orientation === "horizontal" ) {
				this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
			}
			if ( oRange === "min" && this.orientation === "vertical" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );
			}
			if ( oRange === "max" && this.orientation === "vertical" ) {
				this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
			}
		}
	},

	_handleEvents: {
		keydown: function( event ) {
			var allowed, curVal, newVal, step,
				index = $( event.target ).data( "ui-slider-handle-index" );

			switch ( event.keyCode ) {
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.PAGE_UP:
				case $.ui.keyCode.PAGE_DOWN:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					event.preventDefault();
					if ( !this._keySliding ) {
						this._keySliding = true;
						$( event.target ).addClass( "ui-state-active" );
						allowed = this._start( event, index );
						if ( allowed === false ) {
							return;
						}
					}
					break;
			}

			step = this.options.step;
			if ( this.options.values && this.options.values.length ) {
				curVal = newVal = this.values( index );
			} else {
				curVal = newVal = this.value();
			}

			switch ( event.keyCode ) {
				case $.ui.keyCode.HOME:
					newVal = this._valueMin();
					break;
				case $.ui.keyCode.END:
					newVal = this._valueMax();
					break;
				case $.ui.keyCode.PAGE_UP:
					newVal = this._trimAlignValue(
						curVal + ( ( this._valueMax() - this._valueMin() ) / this.numPages )
					);
					break;
				case $.ui.keyCode.PAGE_DOWN:
					newVal = this._trimAlignValue(
						curVal - ( (this._valueMax() - this._valueMin()) / this.numPages ) );
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
					if ( curVal === this._valueMax() ) {
						return;
					}
					newVal = this._trimAlignValue( curVal + step );
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if ( curVal === this._valueMin() ) {
						return;
					}
					newVal = this._trimAlignValue( curVal - step );
					break;
			}

			this._slide( event, index, newVal );
		},
		keyup: function( event ) {
			var index = $( event.target ).data( "ui-slider-handle-index" );

			if ( this._keySliding ) {
				this._keySliding = false;
				this._stop( event, index );
				this._change( event, index );
				$( event.target ).removeClass( "ui-state-active" );
			}
		}
	}
});


/*!
 * jQuery UI Spinner 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/spinner/
 */


function spinner_modifier( fn ) {
	return function() {
		var previous = this.element.val();
		fn.apply( this, arguments );
		this._refresh();
		if ( previous !== this.element.val() ) {
			this._trigger( "change" );
		}
	};
}

var spinner = $.widget( "ui.spinner", {
	version: "1.11.4",
	defaultElement: "<input>",
	widgetEventPrefix: "spin",
	options: {
		culture: null,
		icons: {
			down: "ui-icon-triangle-1-s",
			up: "ui-icon-triangle-1-n"
		},
		incremental: true,
		max: null,
		min: null,
		numberFormat: null,
		page: 10,
		step: 1,

		change: null,
		spin: null,
		start: null,
		stop: null
	},

	_create: function() {
		// handle string values that need to be parsed
		this._setOption( "max", this.options.max );
		this._setOption( "min", this.options.min );
		this._setOption( "step", this.options.step );

		// Only format if there is a value, prevents the field from being marked
		// as invalid in Firefox, see #9573.
		if ( this.value() !== "" ) {
			// Format the value, but don't constrain.
			this._value( this.element.val(), true );
		}

		this._draw();
		this._on( this._events );
		this._refresh();

		// turning off autocomplete prevents the browser from remembering the
		// value when navigating through history, so we re-enable autocomplete
		// if the page is unloaded before the widget is destroyed. #7790
		this._on( this.window, {
			beforeunload: function() {
				this.element.removeAttr( "autocomplete" );
			}
		});
	},

	_getCreateOptions: function() {
		var options = {},
			element = this.element;

		$.each( [ "min", "max", "step" ], function( i, option ) {
			var value = element.attr( option );
			if ( value !== undefined && value.length ) {
				options[ option ] = value;
			}
		});

		return options;
	},

	_events: {
		keydown: function( event ) {
			if ( this._start( event ) && this._keydown( event ) ) {
				event.preventDefault();
			}
		},
		keyup: "_stop",
		focus: function() {
			this.previous = this.element.val();
		},
		blur: function( event ) {
			if ( this.cancelBlur ) {
				delete this.cancelBlur;
				return;
			}

			this._stop();
			this._refresh();
			if ( this.previous !== this.element.val() ) {
				this._trigger( "change", event );
			}
		},
		mousewheel: function( event, delta ) {
			if ( !delta ) {
				return;
			}
			if ( !this.spinning && !this._start( event ) ) {
				return false;
			}

			this._spin( (delta > 0 ? 1 : -1) * this.options.step, event );
			clearTimeout( this.mousewheelTimer );
			this.mousewheelTimer = this._delay(function() {
				if ( this.spinning ) {
					this._stop( event );
				}
			}, 100 );
			event.preventDefault();
		},
		"mousedown .ui-spinner-button": function( event ) {
			var previous;

			// We never want the buttons to have focus; whenever the user is
			// interacting with the spinner, the focus should be on the input.
			// If the input is focused then this.previous is properly set from
			// when the input first received focus. If the input is not focused
			// then we need to set this.previous based on the value before spinning.
			previous = this.element[0] === this.document[0].activeElement ?
				this.previous : this.element.val();
			function checkFocus() {
				var isActive = this.element[0] === this.document[0].activeElement;
				if ( !isActive ) {
					this.element.focus();
					this.previous = previous;
					// support: IE
					// IE sets focus asynchronously, so we need to check if focus
					// moved off of the input because the user clicked on the button.
					this._delay(function() {
						this.previous = previous;
					});
				}
			}

			// ensure focus is on (or stays on) the text field
			event.preventDefault();
			checkFocus.call( this );

			// support: IE
			// IE doesn't prevent moving focus even with event.preventDefault()
			// so we set a flag to know when we should ignore the blur event
			// and check (again) if focus moved off of the input.
			this.cancelBlur = true;
			this._delay(function() {
				delete this.cancelBlur;
				checkFocus.call( this );
			});

			if ( this._start( event ) === false ) {
				return;
			}

			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
		},
		"mouseup .ui-spinner-button": "_stop",
		"mouseenter .ui-spinner-button": function( event ) {
			// button will add ui-state-active if mouse was down while mouseleave and kept down
			if ( !$( event.currentTarget ).hasClass( "ui-state-active" ) ) {
				return;
			}

			if ( this._start( event ) === false ) {
				return false;
			}
			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
		},
		// TODO: do we really want to consider this a stop?
		// shouldn't we just stop the repeater and wait until mouseup before
		// we trigger the stop event?
		"mouseleave .ui-spinner-button": "_stop"
	},

	_draw: function() {
		var uiSpinner = this.uiSpinner = this.element
			.addClass( "ui-spinner-input" )
			.attr( "autocomplete", "off" )
			.wrap( this._uiSpinnerHtml() )
			.parent()
				// add buttons
				.append( this._buttonHtml() );

		this.element.attr( "role", "spinbutton" );

		// button bindings
		this.buttons = uiSpinner.find( ".ui-spinner-button" )
			.attr( "tabIndex", -1 )
			.button()
			.removeClass( "ui-corner-all" );

		// IE 6 doesn't understand height: 50% for the buttons
		// unless the wrapper has an explicit height
		if ( this.buttons.height() > Math.ceil( uiSpinner.height() * 0.5 ) &&
				uiSpinner.height() > 0 ) {
			uiSpinner.height( uiSpinner.height() );
		}

		// disable spinner if element was already disabled
		if ( this.options.disabled ) {
			this.disable();
		}
	},

	_keydown: function( event ) {
		var options = this.options,
			keyCode = $.ui.keyCode;

		switch ( event.keyCode ) {
		case keyCode.UP:
			this._repeat( null, 1, event );
			return true;
		case keyCode.DOWN:
			this._repeat( null, -1, event );
			return true;
		case keyCode.PAGE_UP:
			this._repeat( null, options.page, event );
			return true;
		case keyCode.PAGE_DOWN:
			this._repeat( null, -options.page, event );
			return true;
		}

		return false;
	},

	_uiSpinnerHtml: function() {
		return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
	},

	_buttonHtml: function() {
		return "" +
			"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +
				"<span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" +
			"</a>" +
			"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
				"<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" +
			"</a>";
	},

	_start: function( event ) {
		if ( !this.spinning && this._trigger( "start", event ) === false ) {
			return false;
		}

		if ( !this.counter ) {
			this.counter = 1;
		}
		this.spinning = true;
		return true;
	},

	_repeat: function( i, steps, event ) {
		i = i || 500;

		clearTimeout( this.timer );
		this.timer = this._delay(function() {
			this._repeat( 40, steps, event );
		}, i );

		this._spin( steps * this.options.step, event );
	},

	_spin: function( step, event ) {
		var value = this.value() || 0;

		if ( !this.counter ) {
			this.counter = 1;
		}

		value = this._adjustValue( value + step * this._increment( this.counter ) );

		if ( !this.spinning || this._trigger( "spin", event, { value: value } ) !== false) {
			this._value( value );
			this.counter++;
		}
	},

	_increment: function( i ) {
		var incremental = this.options.incremental;

		if ( incremental ) {
			return $.isFunction( incremental ) ?
				incremental( i ) :
				Math.floor( i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1 );
		}

		return 1;
	},

	_precision: function() {
		var precision = this._precisionOf( this.options.step );
		if ( this.options.min !== null ) {
			precision = Math.max( precision, this._precisionOf( this.options.min ) );
		}
		return precision;
	},

	_precisionOf: function( num ) {
		var str = num.toString(),
			decimal = str.indexOf( "." );
		return decimal === -1 ? 0 : str.length - decimal - 1;
	},

	_adjustValue: function( value ) {
		var base, aboveMin,
			options = this.options;

		// make sure we're at a valid step
		// - find out where we are relative to the base (min or 0)
		base = options.min !== null ? options.min : 0;
		aboveMin = value - base;
		// - round to the nearest step
		aboveMin = Math.round(aboveMin / options.step) * options.step;
		// - rounding is based on 0, so adjust back to our base
		value = base + aboveMin;

		// fix precision from bad JS floating point math
		value = parseFloat( value.toFixed( this._precision() ) );

		// clamp the value
		if ( options.max !== null && value > options.max) {
			return options.max;
		}
		if ( options.min !== null && value < options.min ) {
			return options.min;
		}

		return value;
	},

	_stop: function( event ) {
		if ( !this.spinning ) {
			return;
		}

		clearTimeout( this.timer );
		clearTimeout( this.mousewheelTimer );
		this.counter = 0;
		this.spinning = false;
		this._trigger( "stop", event );
	},

	_setOption: function( key, value ) {
		if ( key === "culture" || key === "numberFormat" ) {
			var prevValue = this._parse( this.element.val() );
			this.options[ key ] = value;
			this.element.val( this._format( prevValue ) );
			return;
		}

		if ( key === "max" || key === "min" || key === "step" ) {
			if ( typeof value === "string" ) {
				value = this._parse( value );
			}
		}
		if ( key === "icons" ) {
			this.buttons.first().find( ".ui-icon" )
				.removeClass( this.options.icons.up )
				.addClass( value.up );
			this.buttons.last().find( ".ui-icon" )
				.removeClass( this.options.icons.down )
				.addClass( value.down );
		}

		this._super( key, value );

		if ( key === "disabled" ) {
			this.widget().toggleClass( "ui-state-disabled", !!value );
			this.element.prop( "disabled", !!value );
			this.buttons.button( value ? "disable" : "enable" );
		}
	},

	_setOptions: spinner_modifier(function( options ) {
		this._super( options );
	}),

	_parse: function( val ) {
		if ( typeof val === "string" && val !== "" ) {
			val = window.Globalize && this.options.numberFormat ?
				Globalize.parseFloat( val, 10, this.options.culture ) : +val;
		}
		return val === "" || isNaN( val ) ? null : val;
	},

	_format: function( value ) {
		if ( value === "" ) {
			return "";
		}
		return window.Globalize && this.options.numberFormat ?
			Globalize.format( value, this.options.numberFormat, this.options.culture ) :
			value;
	},

	_refresh: function() {
		this.element.attr({
			"aria-valuemin": this.options.min,
			"aria-valuemax": this.options.max,
			// TODO: what should we do with values that can't be parsed?
			"aria-valuenow": this._parse( this.element.val() )
		});
	},

	isValid: function() {
		var value = this.value();

		// null is invalid
		if ( value === null ) {
			return false;
		}

		// if value gets adjusted, it's invalid
		return value === this._adjustValue( value );
	},

	// update the value without triggering change
	_value: function( value, allowAny ) {
		var parsed;
		if ( value !== "" ) {
			parsed = this._parse( value );
			if ( parsed !== null ) {
				if ( !allowAny ) {
					parsed = this._adjustValue( parsed );
				}
				value = this._format( parsed );
			}
		}
		this.element.val( value );
		this._refresh();
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-spinner-input" )
			.prop( "disabled", false )
			.removeAttr( "autocomplete" )
			.removeAttr( "role" )
			.removeAttr( "aria-valuemin" )
			.removeAttr( "aria-valuemax" )
			.removeAttr( "aria-valuenow" );
		this.uiSpinner.replaceWith( this.element );
	},

	stepUp: spinner_modifier(function( steps ) {
		this._stepUp( steps );
	}),
	_stepUp: function( steps ) {
		if ( this._start() ) {
			this._spin( (steps || 1) * this.options.step );
			this._stop();
		}
	},

	stepDown: spinner_modifier(function( steps ) {
		this._stepDown( steps );
	}),
	_stepDown: function( steps ) {
		if ( this._start() ) {
			this._spin( (steps || 1) * -this.options.step );
			this._stop();
		}
	},

	pageUp: spinner_modifier(function( pages ) {
		this._stepUp( (pages || 1) * this.options.page );
	}),

	pageDown: spinner_modifier(function( pages ) {
		this._stepDown( (pages || 1) * this.options.page );
	}),

	value: function( newVal ) {
		if ( !arguments.length ) {
			return this._parse( this.element.val() );
		}
		spinner_modifier( this._value ).call( this, newVal );
	},

	widget: function() {
		return this.uiSpinner;
	}
});


/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */


var tabs = $.widget( "ui.tabs", {
	version: "1.11.4",
	delay: 300,
	options: {
		active: null,
		collapsible: false,
		event: "click",
		heightStyle: "content",
		hide: null,
		show: null,

		// callbacks
		activate: null,
		beforeActivate: null,
		beforeLoad: null,
		load: null
	},

	_isLocal: (function() {
		var rhash = /#.*$/;

		return function( anchor ) {
			var anchorUrl, locationUrl;

			// support: IE7
			// IE7 doesn't normalize the href property when set via script (#9317)
			anchor = anchor.cloneNode( false );

			anchorUrl = anchor.href.replace( rhash, "" );
			locationUrl = location.href.replace( rhash, "" );

			// decoding may throw an error if the URL isn't UTF-8 (#9518)
			try {
				anchorUrl = decodeURIComponent( anchorUrl );
			} catch ( error ) {}
			try {
				locationUrl = decodeURIComponent( locationUrl );
			} catch ( error ) {}

			return anchor.hash.length > 1 && anchorUrl === locationUrl;
		};
	})(),

	_create: function() {
		var that = this,
			options = this.options;

		this.running = false;

		this.element
			.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" )
			.toggleClass( "ui-tabs-collapsible", options.collapsible );

		this._processTabs();
		options.active = this._initialActive();

		// Take disabling tabs via class attribute from HTML
		// into account and update option properly.
		if ( $.isArray( options.disabled ) ) {
			options.disabled = $.unique( options.disabled.concat(
				$.map( this.tabs.filter( ".ui-state-disabled" ), function( li ) {
					return that.tabs.index( li );
				})
			) ).sort();
		}

		// check for length avoids error when initializing empty list
		if ( this.options.active !== false && this.anchors.length ) {
			this.active = this._findActive( options.active );
		} else {
			this.active = $();
		}

		this._refresh();

		if ( this.active.length ) {
			this.load( options.active );
		}
	},

	_initialActive: function() {
		var active = this.options.active,
			collapsible = this.options.collapsible,
			locationHash = location.hash.substring( 1 );

		if ( active === null ) {
			// check the fragment identifier in the URL
			if ( locationHash ) {
				this.tabs.each(function( i, tab ) {
					if ( $( tab ).attr( "aria-controls" ) === locationHash ) {
						active = i;
						return false;
					}
				});
			}

			// check for a tab marked active via a class
			if ( active === null ) {
				active = this.tabs.index( this.tabs.filter( ".ui-tabs-active" ) );
			}

			// no active tab, set to false
			if ( active === null || active === -1 ) {
				active = this.tabs.length ? 0 : false;
			}
		}

		// handle numbers: negative, out of range
		if ( active !== false ) {
			active = this.tabs.index( this.tabs.eq( active ) );
			if ( active === -1 ) {
				active = collapsible ? false : 0;
			}
		}

		// don't allow collapsible: false and active: false
		if ( !collapsible && active === false && this.anchors.length ) {
			active = 0;
		}

		return active;
	},

	_getCreateEventData: function() {
		return {
			tab: this.active,
			panel: !this.active.length ? $() : this._getPanelForTab( this.active )
		};
	},

	_tabKeydown: function( event ) {
		var focusedTab = $( this.document[0].activeElement ).closest( "li" ),
			selectedIndex = this.tabs.index( focusedTab ),
			goingForward = true;

		if ( this._handlePageNav( event ) ) {
			return;
		}

		switch ( event.keyCode ) {
			case $.ui.keyCode.RIGHT:
			case $.ui.keyCode.DOWN:
				selectedIndex++;
				break;
			case $.ui.keyCode.UP:
			case $.ui.keyCode.LEFT:
				goingForward = false;
				selectedIndex--;
				break;
			case $.ui.keyCode.END:
				selectedIndex = this.anchors.length - 1;
				break;
			case $.ui.keyCode.HOME:
				selectedIndex = 0;
				break;
			case $.ui.keyCode.SPACE:
				// Activate only, no collapsing
				event.preventDefault();
				clearTimeout( this.activating );
				this._activate( selectedIndex );
				return;
			case $.ui.keyCode.ENTER:
				// Toggle (cancel delayed activation, allow collapsing)
				event.preventDefault();
				clearTimeout( this.activating );
				// Determine if we should collapse or activate
				this._activate( selectedIndex === this.options.active ? false : selectedIndex );
				return;
			default:
				return;
		}

		// Focus the appropriate tab, based on which key was pressed
		event.preventDefault();
		clearTimeout( this.activating );
		selectedIndex = this._focusNextTab( selectedIndex, goingForward );

		// Navigating with control/command key will prevent automatic activation
		if ( !event.ctrlKey && !event.metaKey ) {

			// Update aria-selected immediately so that AT think the tab is already selected.
			// Otherwise AT may confuse the user by stating that they need to activate the tab,
			// but the tab will already be activated by the time the announcement finishes.
			focusedTab.attr( "aria-selected", "false" );
			this.tabs.eq( selectedIndex ).attr( "aria-selected", "true" );

			this.activating = this._delay(function() {
				this.option( "active", selectedIndex );
			}, this.delay );
		}
	},

	_panelKeydown: function( event ) {
		if ( this._handlePageNav( event ) ) {
			return;
		}

		// Ctrl+up moves focus to the current tab
		if ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {
			event.preventDefault();
			this.active.focus();
		}
	},

	// Alt+page up/down moves focus to the previous/next tab (and activates)
	_handlePageNav: function( event ) {
		if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {
			this._activate( this._focusNextTab( this.options.active - 1, false ) );
			return true;
		}
		if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {
			this._activate( this._focusNextTab( this.options.active + 1, true ) );
			return true;
		}
	},

	_findNextTab: function( index, goingForward ) {
		var lastTabIndex = this.tabs.length - 1;

		function constrain() {
			if ( index > lastTabIndex ) {
				index = 0;
			}
			if ( index < 0 ) {
				index = lastTabIndex;
			}
			return index;
		}

		while ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {
			index = goingForward ? index + 1 : index - 1;
		}

		return index;
	},

	_focusNextTab: function( index, goingForward ) {
		index = this._findNextTab( index, goingForward );
		this.tabs.eq( index ).focus();
		return index;
	},

	_setOption: function( key, value ) {
		if ( key === "active" ) {
			// _activate() will handle invalid values and update this.options
			this._activate( value );
			return;
		}

		if ( key === "disabled" ) {
			// don't use the widget factory's disabled handling
			this._setupDisabled( value );
			return;
		}

		this._super( key, value);

		if ( key === "collapsible" ) {
			this.element.toggleClass( "ui-tabs-collapsible", value );
			// Setting collapsible: false while collapsed; open first panel
			if ( !value && this.options.active === false ) {
				this._activate( 0 );
			}
		}

		if ( key === "event" ) {
			this._setupEvents( value );
		}

		if ( key === "heightStyle" ) {
			this._setupHeightStyle( value );
		}
	},

	_sanitizeSelector: function( hash ) {
		return hash ? hash.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
	},

	refresh: function() {
		var options = this.options,
			lis = this.tablist.children( ":has(a[href])" );

		// get disabled tabs from class attribute from HTML
		// this will get converted to a boolean if needed in _refresh()
		options.disabled = $.map( lis.filter( ".ui-state-disabled" ), function( tab ) {
			return lis.index( tab );
		});

		this._processTabs();

		// was collapsed or no tabs
		if ( options.active === false || !this.anchors.length ) {
			options.active = false;
			this.active = $();
		// was active, but active tab is gone
		} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {
			// all remaining tabs are disabled
			if ( this.tabs.length === options.disabled.length ) {
				options.active = false;
				this.active = $();
			// activate previous tab
			} else {
				this._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );
			}
		// was active, active tab still exists
		} else {
			// make sure active index is correct
			options.active = this.tabs.index( this.active );
		}

		this._refresh();
	},

	_refresh: function() {
		this._setupDisabled( this.options.disabled );
		this._setupEvents( this.options.event );
		this._setupHeightStyle( this.options.heightStyle );

		this.tabs.not( this.active ).attr({
			"aria-selected": "false",
			"aria-expanded": "false",
			tabIndex: -1
		});
		this.panels.not( this._getPanelForTab( this.active ) )
			.hide()
			.attr({
				"aria-hidden": "true"
			});

		// Make sure one tab is in the tab order
		if ( !this.active.length ) {
			this.tabs.eq( 0 ).attr( "tabIndex", 0 );
		} else {
			this.active
				.addClass( "ui-tabs-active ui-state-active" )
				.attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				});
			this._getPanelForTab( this.active )
				.show()
				.attr({
					"aria-hidden": "false"
				});
		}
	},

	_processTabs: function() {
		var that = this,
			prevTabs = this.tabs,
			prevAnchors = this.anchors,
			prevPanels = this.panels;

		this.tablist = this._getList()
			.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
			.attr( "role", "tablist" )

			// Prevent users from focusing disabled tabs via click
			.delegate( "> li", "mousedown" + this.eventNamespace, function( event ) {
				if ( $( this ).is( ".ui-state-disabled" ) ) {
					event.preventDefault();
				}
			})

			// support: IE <9
			// Preventing the default action in mousedown doesn't prevent IE
			// from focusing the element, so if the anchor gets focused, blur.
			// We don't have to worry about focusing the previously focused
			// element since clicking on a non-focusable element should focus
			// the body anyway.
			.delegate( ".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				if ( $( this ).closest( "li" ).is( ".ui-state-disabled" ) ) {
					this.blur();
				}
			});

		this.tabs = this.tablist.find( "> li:has(a[href])" )
			.addClass( "ui-state-default ui-corner-top" )
			.attr({
				role: "tab",
				tabIndex: -1
			});

		this.anchors = this.tabs.map(function() {
				return $( "a", this )[ 0 ];
			})
			.addClass( "ui-tabs-anchor" )
			.attr({
				role: "presentation",
				tabIndex: -1
			});

		this.panels = $();

		this.anchors.each(function( i, anchor ) {
			var selector, panel, panelId,
				anchorId = $( anchor ).uniqueId().attr( "id" ),
				tab = $( anchor ).closest( "li" ),
				originalAriaControls = tab.attr( "aria-controls" );

			// inline tab
			if ( that._isLocal( anchor ) ) {
				selector = anchor.hash;
				panelId = selector.substring( 1 );
				panel = that.element.find( that._sanitizeSelector( selector ) );
			// remote tab
			} else {
				// If the tab doesn't already have aria-controls,
				// generate an id by using a throw-away element
				panelId = tab.attr( "aria-controls" ) || $( {} ).uniqueId()[ 0 ].id;
				selector = "#" + panelId;
				panel = that.element.find( selector );
				if ( !panel.length ) {
					panel = that._createPanel( panelId );
					panel.insertAfter( that.panels[ i - 1 ] || that.tablist );
				}
				panel.attr( "aria-live", "polite" );
			}

			if ( panel.length) {
				that.panels = that.panels.add( panel );
			}
			if ( originalAriaControls ) {
				tab.data( "ui-tabs-aria-controls", originalAriaControls );
			}
			tab.attr({
				"aria-controls": panelId,
				"aria-labelledby": anchorId
			});
			panel.attr( "aria-labelledby", anchorId );
		});

		this.panels
			.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
			.attr( "role", "tabpanel" );

		// Avoid memory leaks (#10056)
		if ( prevTabs ) {
			this._off( prevTabs.not( this.tabs ) );
			this._off( prevAnchors.not( this.anchors ) );
			this._off( prevPanels.not( this.panels ) );
		}
	},

	// allow overriding how to find the list for rare usage scenarios (#7715)
	_getList: function() {
		return this.tablist || this.element.find( "ol,ul" ).eq( 0 );
	},

	_createPanel: function( id ) {
		return $( "<div>" )
			.attr( "id", id )
			.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
			.data( "ui-tabs-destroy", true );
	},

	_setupDisabled: function( disabled ) {
		if ( $.isArray( disabled ) ) {
			if ( !disabled.length ) {
				disabled = false;
			} else if ( disabled.length === this.anchors.length ) {
				disabled = true;
			}
		}

		// disable tabs
		for ( var i = 0, li; ( li = this.tabs[ i ] ); i++ ) {
			if ( disabled === true || $.inArray( i, disabled ) !== -1 ) {
				$( li )
					.addClass( "ui-state-disabled" )
					.attr( "aria-disabled", "true" );
			} else {
				$( li )
					.removeClass( "ui-state-disabled" )
					.removeAttr( "aria-disabled" );
			}
		}

		this.options.disabled = disabled;
	},

	_setupEvents: function( event ) {
		var events = {};
		if ( event ) {
			$.each( event.split(" "), function( index, eventName ) {
				events[ eventName ] = "_eventHandler";
			});
		}

		this._off( this.anchors.add( this.tabs ).add( this.panels ) );
		// Always prevent the default action, even when disabled
		this._on( true, this.anchors, {
			click: function( event ) {
				event.preventDefault();
			}
		});
		this._on( this.anchors, events );
		this._on( this.tabs, { keydown: "_tabKeydown" } );
		this._on( this.panels, { keydown: "_panelKeydown" } );

		this._focusable( this.tabs );
		this._hoverable( this.tabs );
	},

	_setupHeightStyle: function( heightStyle ) {
		var maxHeight,
			parent = this.element.parent();

		if ( heightStyle === "fill" ) {
			maxHeight = parent.height();
			maxHeight -= this.element.outerHeight() - this.element.height();

			this.element.siblings( ":visible" ).each(function() {
				var elem = $( this ),
					position = elem.css( "position" );

				if ( position === "absolute" || position === "fixed" ) {
					return;
				}
				maxHeight -= elem.outerHeight( true );
			});

			this.element.children().not( this.panels ).each(function() {
				maxHeight -= $( this ).outerHeight( true );
			});

			this.panels.each(function() {
				$( this ).height( Math.max( 0, maxHeight -
					$( this ).innerHeight() + $( this ).height() ) );
			})
			.css( "overflow", "auto" );
		} else if ( heightStyle === "auto" ) {
			maxHeight = 0;
			this.panels.each(function() {
				maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
			}).height( maxHeight );
		}
	},

	_eventHandler: function( event ) {
		var options = this.options,
			active = this.active,
			anchor = $( event.currentTarget ),
			tab = anchor.closest( "li" ),
			clickedIsActive = tab[ 0 ] === active[ 0 ],
			collapsing = clickedIsActive && options.collapsible,
			toShow = collapsing ? $() : this._getPanelForTab( tab ),
			toHide = !active.length ? $() : this._getPanelForTab( active ),
			eventData = {
				oldTab: active,
				oldPanel: toHide,
				newTab: collapsing ? $() : tab,
				newPanel: toShow
			};

		event.preventDefault();

		if ( tab.hasClass( "ui-state-disabled" ) ||
				// tab is already loading
				tab.hasClass( "ui-tabs-loading" ) ||
				// can't switch durning an animation
				this.running ||
				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||
				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
			return;
		}

		options.active = collapsing ? false : this.tabs.index( tab );

		this.active = clickedIsActive ? $() : tab;
		if ( this.xhr ) {
			this.xhr.abort();
		}

		if ( !toHide.length && !toShow.length ) {
			$.error( "jQuery UI Tabs: Mismatching fragment identifier." );
		}

		if ( toShow.length ) {
			this.load( this.tabs.index( tab ), event );
		}
		this._toggle( event, eventData );
	},

	// handles show/hide for selecting tabs
	_toggle: function( event, eventData ) {
		var that = this,
			toShow = eventData.newPanel,
			toHide = eventData.oldPanel;

		this.running = true;

		function complete() {
			that.running = false;
			that._trigger( "activate", event, eventData );
		}

		function show() {
			eventData.newTab.closest( "li" ).addClass( "ui-tabs-active ui-state-active" );

			if ( toShow.length && that.options.show ) {
				that._show( toShow, that.options.show, complete );
			} else {
				toShow.show();
				complete();
			}
		}

		// start out by hiding, then showing, then completing
		if ( toHide.length && this.options.hide ) {
			this._hide( toHide, this.options.hide, function() {
				eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
				show();
			});
		} else {
			eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
			toHide.hide();
			show();
		}

		toHide.attr( "aria-hidden", "true" );
		eventData.oldTab.attr({
			"aria-selected": "false",
			"aria-expanded": "false"
		});
		// If we're switching tabs, remove the old tab from the tab order.
		// If we're opening from collapsed state, remove the previous tab from the tab order.
		// If we're collapsing, then keep the collapsing tab in the tab order.
		if ( toShow.length && toHide.length ) {
			eventData.oldTab.attr( "tabIndex", -1 );
		} else if ( toShow.length ) {
			this.tabs.filter(function() {
				return $( this ).attr( "tabIndex" ) === 0;
			})
			.attr( "tabIndex", -1 );
		}

		toShow.attr( "aria-hidden", "false" );
		eventData.newTab.attr({
			"aria-selected": "true",
			"aria-expanded": "true",
			tabIndex: 0
		});
	},

	_activate: function( index ) {
		var anchor,
			active = this._findActive( index );

		// trying to activate the already active panel
		if ( active[ 0 ] === this.active[ 0 ] ) {
			return;
		}

		// trying to collapse, simulate a click on the current active header
		if ( !active.length ) {
			active = this.active;
		}

		anchor = active.find( ".ui-tabs-anchor" )[ 0 ];
		this._eventHandler({
			target: anchor,
			currentTarget: anchor,
			preventDefault: $.noop
		});
	},

	_findActive: function( index ) {
		return index === false ? $() : this.tabs.eq( index );
	},

	_getIndex: function( index ) {
		// meta-function to give users option to provide a href string instead of a numerical index.
		if ( typeof index === "string" ) {
			index = this.anchors.index( this.anchors.filter( "[href$='" + index + "']" ) );
		}

		return index;
	},

	_destroy: function() {
		if ( this.xhr ) {
			this.xhr.abort();
		}

		this.element.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" );

		this.tablist
			.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
			.removeAttr( "role" );

		this.anchors
			.removeClass( "ui-tabs-anchor" )
			.removeAttr( "role" )
			.removeAttr( "tabIndex" )
			.removeUniqueId();

		this.tablist.unbind( this.eventNamespace );

		this.tabs.add( this.panels ).each(function() {
			if ( $.data( this, "ui-tabs-destroy" ) ) {
				$( this ).remove();
			} else {
				$( this )
					.removeClass( "ui-state-default ui-state-active ui-state-disabled " +
						"ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel" )
					.removeAttr( "tabIndex" )
					.removeAttr( "aria-live" )
					.removeAttr( "aria-busy" )
					.removeAttr( "aria-selected" )
					.removeAttr( "aria-labelledby" )
					.removeAttr( "aria-hidden" )
					.removeAttr( "aria-expanded" )
					.removeAttr( "role" );
			}
		});

		this.tabs.each(function() {
			var li = $( this ),
				prev = li.data( "ui-tabs-aria-controls" );
			if ( prev ) {
				li
					.attr( "aria-controls", prev )
					.removeData( "ui-tabs-aria-controls" );
			} else {
				li.removeAttr( "aria-controls" );
			}
		});

		this.panels.show();

		if ( this.options.heightStyle !== "content" ) {
			this.panels.css( "height", "" );
		}
	},

	enable: function( index ) {
		var disabled = this.options.disabled;
		if ( disabled === false ) {
			return;
		}

		if ( index === undefined ) {
			disabled = false;
		} else {
			index = this._getIndex( index );
			if ( $.isArray( disabled ) ) {
				disabled = $.map( disabled, function( num ) {
					return num !== index ? num : null;
				});
			} else {
				disabled = $.map( this.tabs, function( li, num ) {
					return num !== index ? num : null;
				});
			}
		}
		this._setupDisabled( disabled );
	},

	disable: function( index ) {
		var disabled = this.options.disabled;
		if ( disabled === true ) {
			return;
		}

		if ( index === undefined ) {
			disabled = true;
		} else {
			index = this._getIndex( index );
			if ( $.inArray( index, disabled ) !== -1 ) {
				return;
			}
			if ( $.isArray( disabled ) ) {
				disabled = $.merge( [ index ], disabled ).sort();
			} else {
				disabled = [ index ];
			}
		}
		this._setupDisabled( disabled );
	},

	load: function( index, event ) {
		index = this._getIndex( index );
		var that = this,
			tab = this.tabs.eq( index ),
			anchor = tab.find( ".ui-tabs-anchor" ),
			panel = this._getPanelForTab( tab ),
			eventData = {
				tab: tab,
				panel: panel
			},
			complete = function( jqXHR, status ) {
				if ( status === "abort" ) {
					that.panels.stop( false, true );
				}

				tab.removeClass( "ui-tabs-loading" );
				panel.removeAttr( "aria-busy" );

				if ( jqXHR === that.xhr ) {
					delete that.xhr;
				}
			};

		// not remote
		if ( this._isLocal( anchor[ 0 ] ) ) {
			return;
		}

		this.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );

		// support: jQuery <1.8
		// jQuery <1.8 returns false if the request is canceled in beforeSend,
		// but as of 1.8, $.ajax() always returns a jqXHR object.
		if ( this.xhr && this.xhr.statusText !== "canceled" ) {
			tab.addClass( "ui-tabs-loading" );
			panel.attr( "aria-busy", "true" );

			this.xhr
				.done(function( response, status, jqXHR ) {
					// support: jQuery <1.8
					// http://bugs.jquery.com/ticket/11778
					setTimeout(function() {
						panel.html( response );
						that._trigger( "load", event, eventData );

						complete( jqXHR, status );
					}, 1 );
				})
				.fail(function( jqXHR, status ) {
					// support: jQuery <1.8
					// http://bugs.jquery.com/ticket/11778
					setTimeout(function() {
						complete( jqXHR, status );
					}, 1 );
				});
		}
	},

	_ajaxSettings: function( anchor, event, eventData ) {
		var that = this;
		return {
			url: anchor.attr( "href" ),
			beforeSend: function( jqXHR, settings ) {
				return that._trigger( "beforeLoad", event,
					$.extend( { jqXHR: jqXHR, ajaxSettings: settings }, eventData ) );
			}
		};
	},

	_getPanelForTab: function( tab ) {
		var id = $( tab ).attr( "aria-controls" );
		return this.element.find( this._sanitizeSelector( "#" + id ) );
	}
});


/*!
 * jQuery UI Tooltip 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tooltip/
 */


var tooltip = $.widget( "ui.tooltip", {
	version: "1.11.4",
	options: {
		content: function() {
			// support: IE<9, Opera in jQuery <1.7
			// .text() can't accept undefined, so coerce to a string
			var title = $( this ).attr( "title" ) || "";
			// Escape title, since we're going from an attribute to raw HTML
			return $( "<a>" ).text( title ).html();
		},
		hide: true,
		// Disabled elements have inconsistent behavior across browsers (#8661)
		items: "[title]:not([disabled])",
		position: {
			my: "left top+15",
			at: "left bottom",
			collision: "flipfit flip"
		},
		show: true,
		tooltipClass: null,
		track: false,

		// callbacks
		close: null,
		open: null
	},

	_addDescribedBy: function( elem, id ) {
		var describedby = (elem.attr( "aria-describedby" ) || "").split( /\s+/ );
		describedby.push( id );
		elem
			.data( "ui-tooltip-id", id )
			.attr( "aria-describedby", $.trim( describedby.join( " " ) ) );
	},

	_removeDescribedBy: function( elem ) {
		var id = elem.data( "ui-tooltip-id" ),
			describedby = (elem.attr( "aria-describedby" ) || "").split( /\s+/ ),
			index = $.inArray( id, describedby );

		if ( index !== -1 ) {
			describedby.splice( index, 1 );
		}

		elem.removeData( "ui-tooltip-id" );
		describedby = $.trim( describedby.join( " " ) );
		if ( describedby ) {
			elem.attr( "aria-describedby", describedby );
		} else {
			elem.removeAttr( "aria-describedby" );
		}
	},

	_create: function() {
		this._on({
			mouseover: "open",
			focusin: "open"
		});

		// IDs of generated tooltips, needed for destroy
		this.tooltips = {};

		// IDs of parent tooltips where we removed the title attribute
		this.parents = {};

		if ( this.options.disabled ) {
			this._disable();
		}

		// Append the aria-live region so tooltips announce correctly
		this.liveRegion = $( "<div>" )
			.attr({
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			})
			.addClass( "ui-helper-hidden-accessible" )
			.appendTo( this.document[ 0 ].body );
	},

	_setOption: function( key, value ) {
		var that = this;

		if ( key === "disabled" ) {
			this[ value ? "_disable" : "_enable" ]();
			this.options[ key ] = value;
			// disable element style changes
			return;
		}

		this._super( key, value );

		if ( key === "content" ) {
			$.each( this.tooltips, function( id, tooltipData ) {
				that._updateContent( tooltipData.element );
			});
		}
	},

	_disable: function() {
		var that = this;

		// close open tooltips
		$.each( this.tooltips, function( id, tooltipData ) {
			var event = $.Event( "blur" );
			event.target = event.currentTarget = tooltipData.element[ 0 ];
			that.close( event, true );
		});

		// remove title attributes to prevent native tooltips
		this.element.find( this.options.items ).addBack().each(function() {
			var element = $( this );
			if ( element.is( "[title]" ) ) {
				element
					.data( "ui-tooltip-title", element.attr( "title" ) )
					.removeAttr( "title" );
			}
		});
	},

	_enable: function() {
		// restore title attributes
		this.element.find( this.options.items ).addBack().each(function() {
			var element = $( this );
			if ( element.data( "ui-tooltip-title" ) ) {
				element.attr( "title", element.data( "ui-tooltip-title" ) );
			}
		});
	},

	open: function( event ) {
		var that = this,
			target = $( event ? event.target : this.element )
				// we need closest here due to mouseover bubbling,
				// but always pointing at the same event target
				.closest( this.options.items );

		// No element to show a tooltip for or the tooltip is already open
		if ( !target.length || target.data( "ui-tooltip-id" ) ) {
			return;
		}

		if ( target.attr( "title" ) ) {
			target.data( "ui-tooltip-title", target.attr( "title" ) );
		}

		target.data( "ui-tooltip-open", true );

		// kill parent tooltips, custom or native, for hover
		if ( event && event.type === "mouseover" ) {
			target.parents().each(function() {
				var parent = $( this ),
					blurEvent;
				if ( parent.data( "ui-tooltip-open" ) ) {
					blurEvent = $.Event( "blur" );
					blurEvent.target = blurEvent.currentTarget = this;
					that.close( blurEvent, true );
				}
				if ( parent.attr( "title" ) ) {
					parent.uniqueId();
					that.parents[ this.id ] = {
						element: this,
						title: parent.attr( "title" )
					};
					parent.attr( "title", "" );
				}
			});
		}

		this._registerCloseHandlers( event, target );
		this._updateContent( target, event );
	},

	_updateContent: function( target, event ) {
		var content,
			contentOption = this.options.content,
			that = this,
			eventType = event ? event.type : null;

		if ( typeof contentOption === "string" ) {
			return this._open( event, target, contentOption );
		}

		content = contentOption.call( target[0], function( response ) {

			// IE may instantly serve a cached response for ajax requests
			// delay this call to _open so the other call to _open runs first
			that._delay(function() {

				// Ignore async response if tooltip was closed already
				if ( !target.data( "ui-tooltip-open" ) ) {
					return;
				}

				// jQuery creates a special event for focusin when it doesn't
				// exist natively. To improve performance, the native event
				// object is reused and the type is changed. Therefore, we can't
				// rely on the type being correct after the event finished
				// bubbling, so we set it back to the previous value. (#8740)
				if ( event ) {
					event.type = eventType;
				}
				this._open( event, target, response );
			});
		});
		if ( content ) {
			this._open( event, target, content );
		}
	},

	_open: function( event, target, content ) {
		var tooltipData, tooltip, delayedShow, a11yContent,
			positionOption = $.extend( {}, this.options.position );

		if ( !content ) {
			return;
		}

		// Content can be updated multiple times. If the tooltip already
		// exists, then just update the content and bail.
		tooltipData = this._find( target );
		if ( tooltipData ) {
			tooltipData.tooltip.find( ".ui-tooltip-content" ).html( content );
			return;
		}

		// if we have a title, clear it to prevent the native tooltip
		// we have to check first to avoid defining a title if none exists
		// (we don't want to cause an element to start matching [title])
		//
		// We use removeAttr only for key events, to allow IE to export the correct
		// accessible attributes. For mouse events, set to empty string to avoid
		// native tooltip showing up (happens only when removing inside mouseover).
		if ( target.is( "[title]" ) ) {
			if ( event && event.type === "mouseover" ) {
				target.attr( "title", "" );
			} else {
				target.removeAttr( "title" );
			}
		}

		tooltipData = this._tooltip( target );
		tooltip = tooltipData.tooltip;
		this._addDescribedBy( target, tooltip.attr( "id" ) );
		tooltip.find( ".ui-tooltip-content" ).html( content );

		// Support: Voiceover on OS X, JAWS on IE <= 9
		// JAWS announces deletions even when aria-relevant="additions"
		// Voiceover will sometimes re-read the entire log region's contents from the beginning
		this.liveRegion.children().hide();
		if ( content.clone ) {
			a11yContent = content.clone();
			a11yContent.removeAttr( "id" ).find( "[id]" ).removeAttr( "id" );
		} else {
			a11yContent = content;
		}
		$( "<div>" ).html( a11yContent ).appendTo( this.liveRegion );

		function position( event ) {
			positionOption.of = event;
			if ( tooltip.is( ":hidden" ) ) {
				return;
			}
			tooltip.position( positionOption );
		}
		if ( this.options.track && event && /^mouse/.test( event.type ) ) {
			this._on( this.document, {
				mousemove: position
			});
			// trigger once to override element-relative positioning
			position( event );
		} else {
			tooltip.position( $.extend({
				of: target
			}, this.options.position ) );
		}

		tooltip.hide();

		this._show( tooltip, this.options.show );
		// Handle tracking tooltips that are shown with a delay (#8644). As soon
		// as the tooltip is visible, position the tooltip using the most recent
		// event.
		if ( this.options.show && this.options.show.delay ) {
			delayedShow = this.delayedShow = setInterval(function() {
				if ( tooltip.is( ":visible" ) ) {
					position( positionOption.of );
					clearInterval( delayedShow );
				}
			}, $.fx.interval );
		}

		this._trigger( "open", event, { tooltip: tooltip } );
	},

	_registerCloseHandlers: function( event, target ) {
		var events = {
			keyup: function( event ) {
				if ( event.keyCode === $.ui.keyCode.ESCAPE ) {
					var fakeEvent = $.Event(event);
					fakeEvent.currentTarget = target[0];
					this.close( fakeEvent, true );
				}
			}
		};

		// Only bind remove handler for delegated targets. Non-delegated
		// tooltips will handle this in destroy.
		if ( target[ 0 ] !== this.element[ 0 ] ) {
			events.remove = function() {
				this._removeTooltip( this._find( target ).tooltip );
			};
		}

		if ( !event || event.type === "mouseover" ) {
			events.mouseleave = "close";
		}
		if ( !event || event.type === "focusin" ) {
			events.focusout = "close";
		}
		this._on( true, target, events );
	},

	close: function( event ) {
		var tooltip,
			that = this,
			target = $( event ? event.currentTarget : this.element ),
			tooltipData = this._find( target );

		// The tooltip may already be closed
		if ( !tooltipData ) {

			// We set ui-tooltip-open immediately upon open (in open()), but only set the
			// additional data once there's actually content to show (in _open()). So even if the
			// tooltip doesn't have full data, we always remove ui-tooltip-open in case we're in
			// the period between open() and _open().
			target.removeData( "ui-tooltip-open" );
			return;
		}

		tooltip = tooltipData.tooltip;

		// disabling closes the tooltip, so we need to track when we're closing
		// to avoid an infinite loop in case the tooltip becomes disabled on close
		if ( tooltipData.closing ) {
			return;
		}

		// Clear the interval for delayed tracking tooltips
		clearInterval( this.delayedShow );

		// only set title if we had one before (see comment in _open())
		// If the title attribute has changed since open(), don't restore
		if ( target.data( "ui-tooltip-title" ) && !target.attr( "title" ) ) {
			target.attr( "title", target.data( "ui-tooltip-title" ) );
		}

		this._removeDescribedBy( target );

		tooltipData.hiding = true;
		tooltip.stop( true );
		this._hide( tooltip, this.options.hide, function() {
			that._removeTooltip( $( this ) );
		});

		target.removeData( "ui-tooltip-open" );
		this._off( target, "mouseleave focusout keyup" );

		// Remove 'remove' binding only on delegated targets
		if ( target[ 0 ] !== this.element[ 0 ] ) {
			this._off( target, "remove" );
		}
		this._off( this.document, "mousemove" );

		if ( event && event.type === "mouseleave" ) {
			$.each( this.parents, function( id, parent ) {
				$( parent.element ).attr( "title", parent.title );
				delete that.parents[ id ];
			});
		}

		tooltipData.closing = true;
		this._trigger( "close", event, { tooltip: tooltip } );
		if ( !tooltipData.hiding ) {
			tooltipData.closing = false;
		}
	},

	_tooltip: function( element ) {
		var tooltip = $( "<div>" )
				.attr( "role", "tooltip" )
				.addClass( "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
					( this.options.tooltipClass || "" ) ),
			id = tooltip.uniqueId().attr( "id" );

		$( "<div>" )
			.addClass( "ui-tooltip-content" )
			.appendTo( tooltip );

		tooltip.appendTo( this.document[0].body );

		return this.tooltips[ id ] = {
			element: element,
			tooltip: tooltip
		};
	},

	_find: function( target ) {
		var id = target.data( "ui-tooltip-id" );
		return id ? this.tooltips[ id ] : null;
	},

	_removeTooltip: function( tooltip ) {
		tooltip.remove();
		delete this.tooltips[ tooltip.attr( "id" ) ];
	},

	_destroy: function() {
		var that = this;

		// close open tooltips
		$.each( this.tooltips, function( id, tooltipData ) {
			// Delegate to close method to handle common cleanup
			var event = $.Event( "blur" ),
				element = tooltipData.element;
			event.target = event.currentTarget = element[ 0 ];
			that.close( event, true );

			// Remove immediately; destroying an open tooltip doesn't use the
			// hide animation
			$( "#" + id ).remove();

			// Restore the title
			if ( element.data( "ui-tooltip-title" ) ) {
				// If the title attribute has changed since open(), don't restore
				if ( !element.attr( "title" ) ) {
					element.attr( "title", element.data( "ui-tooltip-title" ) );
				}
				element.removeData( "ui-tooltip-title" );
			}
		});
		this.liveRegion.remove();
	}
});


/*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */


var dataSpace = "ui-effects-",

	// Create a local jQuery because jQuery Color relies on it and the
	// global may not exist with AMD and a custom build (#10199)
	jQuery = $;

$.effects = {
	effect: {}
};

/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function( jQuery, undefined ) {

	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	// plusequals test for += 100 -= 100
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
	// a set of RE's that can match strings and generate color tuples.
	stringParsers = [ {
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ],
					execResult[ 3 ],
					execResult[ 4 ]
				];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ] * 2.55,
					execResult[ 2 ] * 2.55,
					execResult[ 3 ] * 2.55,
					execResult[ 4 ]
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ], 16 )
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
				];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ] / 100,
					execResult[ 3 ] / 100,
					execResult[ 4 ]
				];
			}
		} ],

	// jQuery.Color( )
	color = jQuery.Color = function( color, green, blue, alpha ) {
		return new jQuery.Color.fn.parse( color, green, blue, alpha );
	},
	spaces = {
		rgba: {
			props: {
				red: {
					idx: 0,
					type: "byte"
				},
				green: {
					idx: 1,
					type: "byte"
				},
				blue: {
					idx: 2,
					type: "byte"
				}
			}
		},

		hsla: {
			props: {
				hue: {
					idx: 0,
					type: "degrees"
				},
				saturation: {
					idx: 1,
					type: "percent"
				},
				lightness: {
					idx: 2,
					type: "percent"
				}
			}
		}
	},
	propTypes = {
		"byte": {
			floor: true,
			max: 255
		},
		"percent": {
			max: 1
		},
		"degrees": {
			mod: 360,
			floor: true
		}
	},
	support = color.support = {},

	// element for support tests
	supportElem = jQuery( "<p>" )[ 0 ],

	// colors = jQuery.Color.names
	colors,

	// local aliases of functions called often
	each = jQuery.each;

// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
	space.cache = "_" + spaceName;
	space.props.alpha = {
		idx: 3,
		type: "percent",
		def: 1
	};
});

function clamp( value, prop, allowEmpty ) {
	var type = propTypes[ prop.type ] || {};

	if ( value == null ) {
		return (allowEmpty || !prop.def) ? null : prop.def;
	}

	// ~~ is an short way of doing floor for positive numbers
	value = type.floor ? ~~value : parseFloat( value );

	// IE will pass in empty strings as value for alpha,
	// which will hit this case
	if ( isNaN( value ) ) {
		return prop.def;
	}

	if ( type.mod ) {
		// we add mod before modding to make sure that negatives values
		// get converted properly: -10 -> 350
		return (value + type.mod) % type.mod;
	}

	// for now all property types without mod have min and max
	return 0 > value ? 0 : type.max < value ? type.max : value;
}

function stringParse( string ) {
	var inst = color(),
		rgba = inst._rgba = [];

	string = string.toLowerCase();

	each( stringParsers, function( i, parser ) {
		var parsed,
			match = parser.re.exec( string ),
			values = match && parser.parse( match ),
			spaceName = parser.space || "rgba";

		if ( values ) {
			parsed = inst[ spaceName ]( values );

			// if this was an rgba parse the assignment might happen twice
			// oh well....
			inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
			rgba = inst._rgba = parsed._rgba;

			// exit each( stringParsers ) here because we matched
			return false;
		}
	});

	// Found a stringParser that handled it
	if ( rgba.length ) {

		// if this came from a parsed string, force "transparent" when alpha is 0
		// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
		if ( rgba.join() === "0,0,0,0" ) {
			jQuery.extend( rgba, colors.transparent );
		}
		return inst;
	}

	// named colors
	return colors[ string ];
}

color.fn = jQuery.extend( color.prototype, {
	parse: function( red, green, blue, alpha ) {
		if ( red === undefined ) {
			this._rgba = [ null, null, null, null ];
			return this;
		}
		if ( red.jquery || red.nodeType ) {
			red = jQuery( red ).css( green );
			green = undefined;
		}

		var inst = this,
			type = jQuery.type( red ),
			rgba = this._rgba = [];

		// more than 1 argument specified - assume ( red, green, blue, alpha )
		if ( green !== undefined ) {
			red = [ red, green, blue, alpha ];
			type = "array";
		}

		if ( type === "string" ) {
			return this.parse( stringParse( red ) || colors._default );
		}

		if ( type === "array" ) {
			each( spaces.rgba.props, function( key, prop ) {
				rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
			});
			return this;
		}

		if ( type === "object" ) {
			if ( red instanceof color ) {
				each( spaces, function( spaceName, space ) {
					if ( red[ space.cache ] ) {
						inst[ space.cache ] = red[ space.cache ].slice();
					}
				});
			} else {
				each( spaces, function( spaceName, space ) {
					var cache = space.cache;
					each( space.props, function( key, prop ) {

						// if the cache doesn't exist, and we know how to convert
						if ( !inst[ cache ] && space.to ) {

							// if the value was null, we don't need to copy it
							// if the key was alpha, we don't need to copy it either
							if ( key === "alpha" || red[ key ] == null ) {
								return;
							}
							inst[ cache ] = space.to( inst._rgba );
						}

						// this is the only case where we allow nulls for ALL properties.
						// call clamp with alwaysAllowEmpty
						inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
					});

					// everything defined but alpha?
					if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
						// use the default of 1
						inst[ cache ][ 3 ] = 1;
						if ( space.from ) {
							inst._rgba = space.from( inst[ cache ] );
						}
					}
				});
			}
			return this;
		}
	},
	is: function( compare ) {
		var is = color( compare ),
			same = true,
			inst = this;

		each( spaces, function( _, space ) {
			var localCache,
				isCache = is[ space.cache ];
			if (isCache) {
				localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
				each( space.props, function( _, prop ) {
					if ( isCache[ prop.idx ] != null ) {
						same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
						return same;
					}
				});
			}
			return same;
		});
		return same;
	},
	_space: function() {
		var used = [],
			inst = this;
		each( spaces, function( spaceName, space ) {
			if ( inst[ space.cache ] ) {
				used.push( spaceName );
			}
		});
		return used.pop();
	},
	transition: function( other, distance ) {
		var end = color( other ),
			spaceName = end._space(),
			space = spaces[ spaceName ],
			startColor = this.alpha() === 0 ? color( "transparent" ) : this,
			start = startColor[ space.cache ] || space.to( startColor._rgba ),
			result = start.slice();

		end = end[ space.cache ];
		each( space.props, function( key, prop ) {
			var index = prop.idx,
				startValue = start[ index ],
				endValue = end[ index ],
				type = propTypes[ prop.type ] || {};

			// if null, don't override start value
			if ( endValue === null ) {
				return;
			}
			// if null - use end
			if ( startValue === null ) {
				result[ index ] = endValue;
			} else {
				if ( type.mod ) {
					if ( endValue - startValue > type.mod / 2 ) {
						startValue += type.mod;
					} else if ( startValue - endValue > type.mod / 2 ) {
						startValue -= type.mod;
					}
				}
				result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
			}
		});
		return this[ spaceName ]( result );
	},
	blend: function( opaque ) {
		// if we are already opaque - return ourself
		if ( this._rgba[ 3 ] === 1 ) {
			return this;
		}

		var rgb = this._rgba.slice(),
			a = rgb.pop(),
			blend = color( opaque )._rgba;

		return color( jQuery.map( rgb, function( v, i ) {
			return ( 1 - a ) * blend[ i ] + a * v;
		}));
	},
	toRgbaString: function() {
		var prefix = "rgba(",
			rgba = jQuery.map( this._rgba, function( v, i ) {
				return v == null ? ( i > 2 ? 1 : 0 ) : v;
			});

		if ( rgba[ 3 ] === 1 ) {
			rgba.pop();
			prefix = "rgb(";
		}

		return prefix + rgba.join() + ")";
	},
	toHslaString: function() {
		var prefix = "hsla(",
			hsla = jQuery.map( this.hsla(), function( v, i ) {
				if ( v == null ) {
					v = i > 2 ? 1 : 0;
				}

				// catch 1 and 2
				if ( i && i < 3 ) {
					v = Math.round( v * 100 ) + "%";
				}
				return v;
			});

		if ( hsla[ 3 ] === 1 ) {
			hsla.pop();
			prefix = "hsl(";
		}
		return prefix + hsla.join() + ")";
	},
	toHexString: function( includeAlpha ) {
		var rgba = this._rgba.slice(),
			alpha = rgba.pop();

		if ( includeAlpha ) {
			rgba.push( ~~( alpha * 255 ) );
		}

		return "#" + jQuery.map( rgba, function( v ) {

			// default to 0 when nulls exist
			v = ( v || 0 ).toString( 16 );
			return v.length === 1 ? "0" + v : v;
		}).join("");
	},
	toString: function() {
		return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
	}
});
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

function hue2rgb( p, q, h ) {
	h = ( h + 1 ) % 1;
	if ( h * 6 < 1 ) {
		return p + ( q - p ) * h * 6;
	}
	if ( h * 2 < 1) {
		return q;
	}
	if ( h * 3 < 2 ) {
		return p + ( q - p ) * ( ( 2 / 3 ) - h ) * 6;
	}
	return p;
}

spaces.hsla.to = function( rgba ) {
	if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
		return [ null, null, null, rgba[ 3 ] ];
	}
	var r = rgba[ 0 ] / 255,
		g = rgba[ 1 ] / 255,
		b = rgba[ 2 ] / 255,
		a = rgba[ 3 ],
		max = Math.max( r, g, b ),
		min = Math.min( r, g, b ),
		diff = max - min,
		add = max + min,
		l = add * 0.5,
		h, s;

	if ( min === max ) {
		h = 0;
	} else if ( r === max ) {
		h = ( 60 * ( g - b ) / diff ) + 360;
	} else if ( g === max ) {
		h = ( 60 * ( b - r ) / diff ) + 120;
	} else {
		h = ( 60 * ( r - g ) / diff ) + 240;
	}

	// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
	// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
	if ( diff === 0 ) {
		s = 0;
	} else if ( l <= 0.5 ) {
		s = diff / add;
	} else {
		s = diff / ( 2 - add );
	}
	return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function( hsla ) {
	if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
		return [ null, null, null, hsla[ 3 ] ];
	}
	var h = hsla[ 0 ] / 360,
		s = hsla[ 1 ],
		l = hsla[ 2 ],
		a = hsla[ 3 ],
		q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
		p = 2 * l - q;

	return [
		Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
		Math.round( hue2rgb( p, q, h ) * 255 ),
		Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
		a
	];
};

each( spaces, function( spaceName, space ) {
	var props = space.props,
		cache = space.cache,
		to = space.to,
		from = space.from;

	// makes rgba() and hsla()
	color.fn[ spaceName ] = function( value ) {

		// generate a cache for this space if it doesn't exist
		if ( to && !this[ cache ] ) {
			this[ cache ] = to( this._rgba );
		}
		if ( value === undefined ) {
			return this[ cache ].slice();
		}

		var ret,
			type = jQuery.type( value ),
			arr = ( type === "array" || type === "object" ) ? value : arguments,
			local = this[ cache ].slice();

		each( props, function( key, prop ) {
			var val = arr[ type === "object" ? key : prop.idx ];
			if ( val == null ) {
				val = local[ prop.idx ];
			}
			local[ prop.idx ] = clamp( val, prop );
		});

		if ( from ) {
			ret = color( from( local ) );
			ret[ cache ] = local;
			return ret;
		} else {
			return color( local );
		}
	};

	// makes red() green() blue() alpha() hue() saturation() lightness()
	each( props, function( key, prop ) {
		// alpha is included in more than one space
		if ( color.fn[ key ] ) {
			return;
		}
		color.fn[ key ] = function( value ) {
			var vtype = jQuery.type( value ),
				fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
				local = this[ fn ](),
				cur = local[ prop.idx ],
				match;

			if ( vtype === "undefined" ) {
				return cur;
			}

			if ( vtype === "function" ) {
				value = value.call( this, cur );
				vtype = jQuery.type( value );
			}
			if ( value == null && prop.empty ) {
				return this;
			}
			if ( vtype === "string" ) {
				match = rplusequals.exec( value );
				if ( match ) {
					value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
				}
			}
			local[ prop.idx ] = value;
			return this[ fn ]( local );
		};
	});
});

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
	var hooks = hook.split( " " );
	each( hooks, function( i, hook ) {
		jQuery.cssHooks[ hook ] = {
			set: function( elem, value ) {
				var parsed, curElem,
					backgroundColor = "";

				if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
					value = color( parsed || value );
					if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
						curElem = hook === "backgroundColor" ? elem.parentNode : elem;
						while (
							(backgroundColor === "" || backgroundColor === "transparent") &&
							curElem && curElem.style
						) {
							try {
								backgroundColor = jQuery.css( curElem, "backgroundColor" );
								curElem = curElem.parentNode;
							} catch ( e ) {
							}
						}

						value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
							backgroundColor :
							"_default" );
					}

					value = value.toRgbaString();
				}
				try {
					elem.style[ hook ] = value;
				} catch ( e ) {
					// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
				}
			}
		};
		jQuery.fx.step[ hook ] = function( fx ) {
			if ( !fx.colorInit ) {
				fx.start = color( fx.elem, hook );
				fx.end = color( fx.end );
				fx.colorInit = true;
			}
			jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
		};
	});

};

color.hook( stepHooks );

jQuery.cssHooks.borderColor = {
	expand: function( value ) {
		var expanded = {};

		each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
			expanded[ "border" + part + "Color" ] = value;
		});
		return expanded;
	}
};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
	// 4.1. Basic color keywords
	aqua: "#00ffff",
	black: "#000000",
	blue: "#0000ff",
	fuchsia: "#ff00ff",
	gray: "#808080",
	green: "#008000",
	lime: "#00ff00",
	maroon: "#800000",
	navy: "#000080",
	olive: "#808000",
	purple: "#800080",
	red: "#ff0000",
	silver: "#c0c0c0",
	teal: "#008080",
	white: "#ffffff",
	yellow: "#ffff00",

	// 4.2.3. "transparent" color keyword
	transparent: [ null, null, null, 0 ],

	_default: "#ffffff"
};

})( jQuery );

/******************************************************************************/
/****************************** CLASS ANIMATIONS ******************************/
/******************************************************************************/
(function() {

var classAnimationActions = [ "add", "remove", "toggle" ],
	shorthandStyles = {
		border: 1,
		borderBottom: 1,
		borderColor: 1,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 1,
		borderWidth: 1,
		margin: 1,
		padding: 1
	};

$.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function( _, prop ) {
	$.fx.step[ prop ] = function( fx ) {
		if ( fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr ) {
			jQuery.style( fx.elem, prop, fx.end );
			fx.setAttr = true;
		}
	};
});

function getElementStyles( elem ) {
	var key, len,
		style = elem.ownerDocument.defaultView ?
			elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :
			elem.currentStyle,
		styles = {};

	if ( style && style.length && style[ 0 ] && style[ style[ 0 ] ] ) {
		len = style.length;
		while ( len-- ) {
			key = style[ len ];
			if ( typeof style[ key ] === "string" ) {
				styles[ $.camelCase( key ) ] = style[ key ];
			}
		}
	// support: Opera, IE <9
	} else {
		for ( key in style ) {
			if ( typeof style[ key ] === "string" ) {
				styles[ key ] = style[ key ];
			}
		}
	}

	return styles;
}

function styleDifference( oldStyle, newStyle ) {
	var diff = {},
		name, value;

	for ( name in newStyle ) {
		value = newStyle[ name ];
		if ( oldStyle[ name ] !== value ) {
			if ( !shorthandStyles[ name ] ) {
				if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {
					diff[ name ] = value;
				}
			}
		}
	}

	return diff;
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

$.effects.animateClass = function( value, duration, easing, callback ) {
	var o = $.speed( duration, easing, callback );

	return this.queue( function() {
		var animated = $( this ),
			baseClass = animated.attr( "class" ) || "",
			applyClassChange,
			allAnimations = o.children ? animated.find( "*" ).addBack() : animated;

		// map the animated objects to store the original styles.
		allAnimations = allAnimations.map(function() {
			var el = $( this );
			return {
				el: el,
				start: getElementStyles( this )
			};
		});

		// apply class change
		applyClassChange = function() {
			$.each( classAnimationActions, function(i, action) {
				if ( value[ action ] ) {
					animated[ action + "Class" ]( value[ action ] );
				}
			});
		};
		applyClassChange();

		// map all animated objects again - calculate new styles and diff
		allAnimations = allAnimations.map(function() {
			this.end = getElementStyles( this.el[ 0 ] );
			this.diff = styleDifference( this.start, this.end );
			return this;
		});

		// apply original class
		animated.attr( "class", baseClass );

		// map all animated objects again - this time collecting a promise
		allAnimations = allAnimations.map(function() {
			var styleInfo = this,
				dfd = $.Deferred(),
				opts = $.extend({}, o, {
					queue: false,
					complete: function() {
						dfd.resolve( styleInfo );
					}
				});

			this.el.animate( this.diff, opts );
			return dfd.promise();
		});

		// once all animations have completed:
		$.when.apply( $, allAnimations.get() ).done(function() {

			// set the final class
			applyClassChange();

			// for each animated element,
			// clear all css properties that were animated
			$.each( arguments, function() {
				var el = this.el;
				$.each( this.diff, function(key) {
					el.css( key, "" );
				});
			});

			// this is guarnteed to be there if you use jQuery.speed()
			// it also handles dequeuing the next anim...
			o.complete.call( animated[ 0 ] );
		});
	});
};

$.fn.extend({
	addClass: (function( orig ) {
		return function( classNames, speed, easing, callback ) {
			return speed ?
				$.effects.animateClass.call( this,
					{ add: classNames }, speed, easing, callback ) :
				orig.apply( this, arguments );
		};
	})( $.fn.addClass ),

	removeClass: (function( orig ) {
		return function( classNames, speed, easing, callback ) {
			return arguments.length > 1 ?
				$.effects.animateClass.call( this,
					{ remove: classNames }, speed, easing, callback ) :
				orig.apply( this, arguments );
		};
	})( $.fn.removeClass ),

	toggleClass: (function( orig ) {
		return function( classNames, force, speed, easing, callback ) {
			if ( typeof force === "boolean" || force === undefined ) {
				if ( !speed ) {
					// without speed parameter
					return orig.apply( this, arguments );
				} else {
					return $.effects.animateClass.call( this,
						(force ? { add: classNames } : { remove: classNames }),
						speed, easing, callback );
				}
			} else {
				// without force parameter
				return $.effects.animateClass.call( this,
					{ toggle: classNames }, force, speed, easing );
			}
		};
	})( $.fn.toggleClass ),

	switchClass: function( remove, add, speed, easing, callback) {
		return $.effects.animateClass.call( this, {
			add: add,
			remove: remove
		}, speed, easing, callback );
	}
});

})();

/******************************************************************************/
/*********************************** EFFECTS **********************************/
/******************************************************************************/

(function() {

$.extend( $.effects, {
	version: "1.11.4",

	// Saves a set of properties in a data storage
	save: function( element, set ) {
		for ( var i = 0; i < set.length; i++ ) {
			if ( set[ i ] !== null ) {
				element.data( dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ] );
			}
		}
	},

	// Restores a set of previously saved properties from a data storage
	restore: function( element, set ) {
		var val, i;
		for ( i = 0; i < set.length; i++ ) {
			if ( set[ i ] !== null ) {
				val = element.data( dataSpace + set[ i ] );
				// support: jQuery 1.6.2
				// http://bugs.jquery.com/ticket/9917
				// jQuery 1.6.2 incorrectly returns undefined for any falsy value.
				// We can't differentiate between "" and 0 here, so we just assume
				// empty string since it's likely to be a more common value...
				if ( val === undefined ) {
					val = "";
				}
				element.css( set[ i ], val );
			}
		}
	},

	setMode: function( el, mode ) {
		if (mode === "toggle") {
			mode = el.is( ":hidden" ) ? "show" : "hide";
		}
		return mode;
	},

	// Translates a [top,left] array into a baseline value
	// this should be a little more flexible in the future to handle a string & hash
	getBaseline: function( origin, original ) {
		var y, x;
		switch ( origin[ 0 ] ) {
			case "top": y = 0; break;
			case "middle": y = 0.5; break;
			case "bottom": y = 1; break;
			default: y = origin[ 0 ] / original.height;
		}
		switch ( origin[ 1 ] ) {
			case "left": x = 0; break;
			case "center": x = 0.5; break;
			case "right": x = 1; break;
			default: x = origin[ 1 ] / original.width;
		}
		return {
			x: x,
			y: y
		};
	},

	// Wraps the element around a wrapper that copies position properties
	createWrapper: function( element ) {

		// if the element is already wrapped, return it
		if ( element.parent().is( ".ui-effects-wrapper" )) {
			return element.parent();
		}

		// wrap the element
		var props = {
				width: element.outerWidth(true),
				height: element.outerHeight(true),
				"float": element.css( "float" )
			},
			wrapper = $( "<div></div>" )
				.addClass( "ui-effects-wrapper" )
				.css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),
			// Store the size in case width/height are defined in % - Fixes #5245
			size = {
				width: element.width(),
				height: element.height()
			},
			active = document.activeElement;

		// support: Firefox
		// Firefox incorrectly exposes anonymous content
		// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
		try {
			active.id;
		} catch ( e ) {
			active = document.body;
		}

		element.wrap( wrapper );

		// Fixes #7595 - Elements lose focus when wrapped.
		if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
			$( active ).focus();
		}

		wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element

		// transfer positioning properties to the wrapper
		if ( element.css( "position" ) === "static" ) {
			wrapper.css({ position: "relative" });
			element.css({ position: "relative" });
		} else {
			$.extend( props, {
				position: element.css( "position" ),
				zIndex: element.css( "z-index" )
			});
			$.each([ "top", "left", "bottom", "right" ], function(i, pos) {
				props[ pos ] = element.css( pos );
				if ( isNaN( parseInt( props[ pos ], 10 ) ) ) {
					props[ pos ] = "auto";
				}
			});
			element.css({
				position: "relative",
				top: 0,
				left: 0,
				right: "auto",
				bottom: "auto"
			});
		}
		element.css(size);

		return wrapper.css( props ).show();
	},

	removeWrapper: function( element ) {
		var active = document.activeElement;

		if ( element.parent().is( ".ui-effects-wrapper" ) ) {
			element.parent().replaceWith( element );

			// Fixes #7595 - Elements lose focus when wrapped.
			if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
				$( active ).focus();
			}
		}

		return element;
	},

	setTransition: function( element, list, factor, value ) {
		value = value || {};
		$.each( list, function( i, x ) {
			var unit = element.cssUnit( x );
			if ( unit[ 0 ] > 0 ) {
				value[ x ] = unit[ 0 ] * factor + unit[ 1 ];
			}
		});
		return value;
	}
});

// return an effect options object for the given parameters:
function _normalizeArguments( effect, options, speed, callback ) {

	// allow passing all options as the first parameter
	if ( $.isPlainObject( effect ) ) {
		options = effect;
		effect = effect.effect;
	}

	// convert to an object
	effect = { effect: effect };

	// catch (effect, null, ...)
	if ( options == null ) {
		options = {};
	}

	// catch (effect, callback)
	if ( $.isFunction( options ) ) {
		callback = options;
		speed = null;
		options = {};
	}

	// catch (effect, speed, ?)
	if ( typeof options === "number" || $.fx.speeds[ options ] ) {
		callback = speed;
		speed = options;
		options = {};
	}

	// catch (effect, options, callback)
	if ( $.isFunction( speed ) ) {
		callback = speed;
		speed = null;
	}

	// add options to effect
	if ( options ) {
		$.extend( effect, options );
	}

	speed = speed || options.duration;
	effect.duration = $.fx.off ? 0 :
		typeof speed === "number" ? speed :
		speed in $.fx.speeds ? $.fx.speeds[ speed ] :
		$.fx.speeds._default;

	effect.complete = callback || options.complete;

	return effect;
}

function standardAnimationOption( option ) {
	// Valid standard speeds (nothing, number, named speed)
	if ( !option || typeof option === "number" || $.fx.speeds[ option ] ) {
		return true;
	}

	// Invalid strings - treat as "normal" speed
	if ( typeof option === "string" && !$.effects.effect[ option ] ) {
		return true;
	}

	// Complete callback
	if ( $.isFunction( option ) ) {
		return true;
	}

	// Options hash (but not naming an effect)
	if ( typeof option === "object" && !option.effect ) {
		return true;
	}

	// Didn't match any standard API
	return false;
}

$.fn.extend({
	effect: function( /* effect, options, speed, callback */ ) {
		var args = _normalizeArguments.apply( this, arguments ),
			mode = args.mode,
			queue = args.queue,
			effectMethod = $.effects.effect[ args.effect ];

		if ( $.fx.off || !effectMethod ) {
			// delegate to the original method (e.g., .show()) if possible
			if ( mode ) {
				return this[ mode ]( args.duration, args.complete );
			} else {
				return this.each( function() {
					if ( args.complete ) {
						args.complete.call( this );
					}
				});
			}
		}

		function run( next ) {
			var elem = $( this ),
				complete = args.complete,
				mode = args.mode;

			function done() {
				if ( $.isFunction( complete ) ) {
					complete.call( elem[0] );
				}
				if ( $.isFunction( next ) ) {
					next();
				}
			}

			// If the element already has the correct final state, delegate to
			// the core methods so the internal tracking of "olddisplay" works.
			if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {
				elem[ mode ]();
				done();
			} else {
				effectMethod.call( elem[0], args, done );
			}
		}

		return queue === false ? this.each( run ) : this.queue( queue || "fx", run );
	},

	show: (function( orig ) {
		return function( option ) {
			if ( standardAnimationOption( option ) ) {
				return orig.apply( this, arguments );
			} else {
				var args = _normalizeArguments.apply( this, arguments );
				args.mode = "show";
				return this.effect.call( this, args );
			}
		};
	})( $.fn.show ),

	hide: (function( orig ) {
		return function( option ) {
			if ( standardAnimationOption( option ) ) {
				return orig.apply( this, arguments );
			} else {
				var args = _normalizeArguments.apply( this, arguments );
				args.mode = "hide";
				return this.effect.call( this, args );
			}
		};
	})( $.fn.hide ),

	toggle: (function( orig ) {
		return function( option ) {
			if ( standardAnimationOption( option ) || typeof option === "boolean" ) {
				return orig.apply( this, arguments );
			} else {
				var args = _normalizeArguments.apply( this, arguments );
				args.mode = "toggle";
				return this.effect.call( this, args );
			}
		};
	})( $.fn.toggle ),

	// helper functions
	cssUnit: function(key) {
		var style = this.css( key ),
			val = [];

		$.each( [ "em", "px", "%", "pt" ], function( i, unit ) {
			if ( style.indexOf( unit ) > 0 ) {
				val = [ parseFloat( style ), unit ];
			}
		});
		return val;
	}
});

})();

/******************************************************************************/
/*********************************** EASING ***********************************/
/******************************************************************************/

(function() {

// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

var baseEasings = {};

$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
	baseEasings[ name ] = function( p ) {
		return Math.pow( p, i + 2 );
	};
});

$.extend( baseEasings, {
	Sine: function( p ) {
		return 1 - Math.cos( p * Math.PI / 2 );
	},
	Circ: function( p ) {
		return 1 - Math.sqrt( 1 - p * p );
	},
	Elastic: function( p ) {
		return p === 0 || p === 1 ? p :
			-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
	},
	Back: function( p ) {
		return p * p * ( 3 * p - 2 );
	},
	Bounce: function( p ) {
		var pow2,
			bounce = 4;

		while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
		return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
	}
});

$.each( baseEasings, function( name, easeIn ) {
	$.easing[ "easeIn" + name ] = easeIn;
	$.easing[ "easeOut" + name ] = function( p ) {
		return 1 - easeIn( 1 - p );
	};
	$.easing[ "easeInOut" + name ] = function( p ) {
		return p < 0.5 ?
			easeIn( p * 2 ) / 2 :
			1 - easeIn( p * -2 + 2 ) / 2;
	};
});

})();

var effect = $.effects;


/*!
 * jQuery UI Effects Blind 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/blind-effect/
 */


var effectBlind = $.effects.effect.blind = function( o, done ) {
	// Create element
	var el = $( this ),
		rvertical = /up|down|vertical/,
		rpositivemotion = /up|left|vertical|horizontal/,
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
		mode = $.effects.setMode( el, o.mode || "hide" ),
		direction = o.direction || "up",
		vertical = rvertical.test( direction ),
		ref = vertical ? "height" : "width",
		ref2 = vertical ? "top" : "left",
		motion = rpositivemotion.test( direction ),
		animation = {},
		show = mode === "show",
		wrapper, distance, margin;

	// if already wrapped, the wrapper's properties are my property. #6245
	if ( el.parent().is( ".ui-effects-wrapper" ) ) {
		$.effects.save( el.parent(), props );
	} else {
		$.effects.save( el, props );
	}
	el.show();
	wrapper = $.effects.createWrapper( el ).css({
		overflow: "hidden"
	});

	distance = wrapper[ ref ]();
	margin = parseFloat( wrapper.css( ref2 ) ) || 0;

	animation[ ref ] = show ? distance : 0;
	if ( !motion ) {
		el
			.css( vertical ? "bottom" : "right", 0 )
			.css( vertical ? "top" : "left", "auto" )
			.css({ position: "absolute" });

		animation[ ref2 ] = show ? margin : distance + margin;
	}

	// start at 0 if we are showing
	if ( show ) {
		wrapper.css( ref, 0 );
		if ( !motion ) {
			wrapper.css( ref2, margin + distance );
		}
	}

	// Animate
	wrapper.animate( animation, {
		duration: o.duration,
		easing: o.easing,
		queue: false,
		complete: function() {
			if ( mode === "hide" ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		}
	});
};


/*!
 * jQuery UI Effects Bounce 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/bounce-effect/
 */


var effectBounce = $.effects.effect.bounce = function( o, done ) {
	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],

		// defaults:
		mode = $.effects.setMode( el, o.mode || "effect" ),
		hide = mode === "hide",
		show = mode === "show",
		direction = o.direction || "up",
		distance = o.distance,
		times = o.times || 5,

		// number of internal animations
		anims = times * 2 + ( show || hide ? 1 : 0 ),
		speed = o.duration / anims,
		easing = o.easing,

		// utility:
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		motion = ( direction === "up" || direction === "left" ),
		i,
		upAnim,
		downAnim,

		// we will need to re-assemble the queue to stack our animations in place
		queue = el.queue(),
		queuelen = queue.length;

	// Avoid touching opacity to prevent clearType and PNG issues in IE
	if ( show || hide ) {
		props.push( "opacity" );
	}

	$.effects.save( el, props );
	el.show();
	$.effects.createWrapper( el ); // Create Wrapper

	// default distance for the BIGGEST bounce is the outer Distance / 3
	if ( !distance ) {
		distance = el[ ref === "top" ? "outerHeight" : "outerWidth" ]() / 3;
	}

	if ( show ) {
		downAnim = { opacity: 1 };
		downAnim[ ref ] = 0;

		// if we are showing, force opacity 0 and set the initial position
		// then do the "first" animation
		el.css( "opacity", 0 )
			.css( ref, motion ? -distance * 2 : distance * 2 )
			.animate( downAnim, speed, easing );
	}

	// start at the smallest distance if we are hiding
	if ( hide ) {
		distance = distance / Math.pow( 2, times - 1 );
	}

	downAnim = {};
	downAnim[ ref ] = 0;
	// Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
	for ( i = 0; i < times; i++ ) {
		upAnim = {};
		upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;

		el.animate( upAnim, speed, easing )
			.animate( downAnim, speed, easing );

		distance = hide ? distance * 2 : distance / 2;
	}

	// Last Bounce when Hiding
	if ( hide ) {
		upAnim = { opacity: 0 };
		upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;

		el.animate( upAnim, speed, easing );
	}

	el.queue(function() {
		if ( hide ) {
			el.hide();
		}
		$.effects.restore( el, props );
		$.effects.removeWrapper( el );
		done();
	});

	// inject all the animations we just queued to be first in line (after "inprogress")
	if ( queuelen > 1) {
		queue.splice.apply( queue,
			[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );
	}
	el.dequeue();

};


/*!
 * jQuery UI Effects Clip 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/clip-effect/
 */


var effectClip = $.effects.effect.clip = function( o, done ) {
	// Create element
	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
		mode = $.effects.setMode( el, o.mode || "hide" ),
		show = mode === "show",
		direction = o.direction || "vertical",
		vert = direction === "vertical",
		size = vert ? "height" : "width",
		position = vert ? "top" : "left",
		animation = {},
		wrapper, animate, distance;

	// Save & Show
	$.effects.save( el, props );
	el.show();

	// Create Wrapper
	wrapper = $.effects.createWrapper( el ).css({
		overflow: "hidden"
	});
	animate = ( el[0].tagName === "IMG" ) ? wrapper : el;
	distance = animate[ size ]();

	// Shift
	if ( show ) {
		animate.css( size, 0 );
		animate.css( position, distance / 2 );
	}

	// Create Animation Object:
	animation[ size ] = show ? distance : 0;
	animation[ position ] = show ? 0 : distance / 2;

	// Animate
	animate.animate( animation, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			if ( !show ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		}
	});

};


/*!
 * jQuery UI Effects Drop 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/drop-effect/
 */


var effectDrop = $.effects.effect.drop = function( o, done ) {

	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "opacity", "height", "width" ],
		mode = $.effects.setMode( el, o.mode || "hide" ),
		show = mode === "show",
		direction = o.direction || "left",
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		motion = ( direction === "up" || direction === "left" ) ? "pos" : "neg",
		animation = {
			opacity: show ? 1 : 0
		},
		distance;

	// Adjust
	$.effects.save( el, props );
	el.show();
	$.effects.createWrapper( el );

	distance = o.distance || el[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ) / 2;

	if ( show ) {
		el
			.css( "opacity", 0 )
			.css( ref, motion === "pos" ? -distance : distance );
	}

	// Animation
	animation[ ref ] = ( show ?
		( motion === "pos" ? "+=" : "-=" ) :
		( motion === "pos" ? "-=" : "+=" ) ) +
		distance;

	// Animate
	el.animate( animation, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			if ( mode === "hide" ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		}
	});
};


/*!
 * jQuery UI Effects Explode 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/explode-effect/
 */


var effectExplode = $.effects.effect.explode = function( o, done ) {

	var rows = o.pieces ? Math.round( Math.sqrt( o.pieces ) ) : 3,
		cells = rows,
		el = $( this ),
		mode = $.effects.setMode( el, o.mode || "hide" ),
		show = mode === "show",

		// show and then visibility:hidden the element before calculating offset
		offset = el.show().css( "visibility", "hidden" ).offset(),

		// width and height of a piece
		width = Math.ceil( el.outerWidth() / cells ),
		height = Math.ceil( el.outerHeight() / rows ),
		pieces = [],

		// loop
		i, j, left, top, mx, my;

	// children animate complete:
	function childComplete() {
		pieces.push( this );
		if ( pieces.length === rows * cells ) {
			animComplete();
		}
	}

	// clone the element for each row and cell.
	for ( i = 0; i < rows ; i++ ) { // ===>
		top = offset.top + i * height;
		my = i - ( rows - 1 ) / 2 ;

		for ( j = 0; j < cells ; j++ ) { // |||
			left = offset.left + j * width;
			mx = j - ( cells - 1 ) / 2 ;

			// Create a clone of the now hidden main element that will be absolute positioned
			// within a wrapper div off the -left and -top equal to size of our pieces
			el
				.clone()
				.appendTo( "body" )
				.wrap( "<div></div>" )
				.css({
					position: "absolute",
					visibility: "visible",
					left: -j * width,
					top: -i * height
				})

			// select the wrapper - make it overflow: hidden and absolute positioned based on
			// where the original was located +left and +top equal to the size of pieces
				.parent()
				.addClass( "ui-effects-explode" )
				.css({
					position: "absolute",
					overflow: "hidden",
					width: width,
					height: height,
					left: left + ( show ? mx * width : 0 ),
					top: top + ( show ? my * height : 0 ),
					opacity: show ? 0 : 1
				}).animate({
					left: left + ( show ? 0 : mx * width ),
					top: top + ( show ? 0 : my * height ),
					opacity: show ? 1 : 0
				}, o.duration || 500, o.easing, childComplete );
		}
	}

	function animComplete() {
		el.css({
			visibility: "visible"
		});
		$( pieces ).remove();
		if ( !show ) {
			el.hide();
		}
		done();
	}
};


/*!
 * jQuery UI Effects Fade 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 */


var effectFade = $.effects.effect.fade = function( o, done ) {
	var el = $( this ),
		mode = $.effects.setMode( el, o.mode || "toggle" );

	el.animate({
		opacity: mode
	}, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: done
	});
};


/*!
 * jQuery UI Effects Fold 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 */


var effectFold = $.effects.effect.fold = function( o, done ) {

	// Create element
	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
		mode = $.effects.setMode( el, o.mode || "hide" ),
		show = mode === "show",
		hide = mode === "hide",
		size = o.size || 15,
		percent = /([0-9]+)%/.exec( size ),
		horizFirst = !!o.horizFirst,
		widthFirst = show !== horizFirst,
		ref = widthFirst ? [ "width", "height" ] : [ "height", "width" ],
		duration = o.duration / 2,
		wrapper, distance,
		animation1 = {},
		animation2 = {};

	$.effects.save( el, props );
	el.show();

	// Create Wrapper
	wrapper = $.effects.createWrapper( el ).css({
		overflow: "hidden"
	});
	distance = widthFirst ?
		[ wrapper.width(), wrapper.height() ] :
		[ wrapper.height(), wrapper.width() ];

	if ( percent ) {
		size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];
	}
	if ( show ) {
		wrapper.css( horizFirst ? {
			height: 0,
			width: size
		} : {
			height: size,
			width: 0
		});
	}

	// Animation
	animation1[ ref[ 0 ] ] = show ? distance[ 0 ] : size;
	animation2[ ref[ 1 ] ] = show ? distance[ 1 ] : 0;

	// Animate
	wrapper
		.animate( animation1, duration, o.easing )
		.animate( animation2, duration, o.easing, function() {
			if ( hide ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		});

};


/*!
 * jQuery UI Effects Highlight 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/highlight-effect/
 */


var effectHighlight = $.effects.effect.highlight = function( o, done ) {
	var elem = $( this ),
		props = [ "backgroundImage", "backgroundColor", "opacity" ],
		mode = $.effects.setMode( elem, o.mode || "show" ),
		animation = {
			backgroundColor: elem.css( "backgroundColor" )
		};

	if (mode === "hide") {
		animation.opacity = 0;
	}

	$.effects.save( elem, props );

	elem
		.show()
		.css({
			backgroundImage: "none",
			backgroundColor: o.color || "#ffff99"
		})
		.animate( animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				if ( mode === "hide" ) {
					elem.hide();
				}
				$.effects.restore( elem, props );
				done();
			}
		});
};


/*!
 * jQuery UI Effects Size 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/size-effect/
 */


var effectSize = $.effects.effect.size = function( o, done ) {

	// Create element
	var original, baseline, factor,
		el = $( this ),
		props0 = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ],

		// Always restore
		props1 = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ],

		// Copy for children
		props2 = [ "width", "height", "overflow" ],
		cProps = [ "fontSize" ],
		vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
		hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],

		// Set options
		mode = $.effects.setMode( el, o.mode || "effect" ),
		restore = o.restore || mode !== "effect",
		scale = o.scale || "both",
		origin = o.origin || [ "middle", "center" ],
		position = el.css( "position" ),
		props = restore ? props0 : props1,
		zero = {
			height: 0,
			width: 0,
			outerHeight: 0,
			outerWidth: 0
		};

	if ( mode === "show" ) {
		el.show();
	}
	original = {
		height: el.height(),
		width: el.width(),
		outerHeight: el.outerHeight(),
		outerWidth: el.outerWidth()
	};

	if ( o.mode === "toggle" && mode === "show" ) {
		el.from = o.to || zero;
		el.to = o.from || original;
	} else {
		el.from = o.from || ( mode === "show" ? zero : original );
		el.to = o.to || ( mode === "hide" ? zero : original );
	}

	// Set scaling factor
	factor = {
		from: {
			y: el.from.height / original.height,
			x: el.from.width / original.width
		},
		to: {
			y: el.to.height / original.height,
			x: el.to.width / original.width
		}
	};

	// Scale the css box
	if ( scale === "box" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			props = props.concat( vProps );
			el.from = $.effects.setTransition( el, vProps, factor.from.y, el.from );
			el.to = $.effects.setTransition( el, vProps, factor.to.y, el.to );
		}

		// Horizontal props scaling
		if ( factor.from.x !== factor.to.x ) {
			props = props.concat( hProps );
			el.from = $.effects.setTransition( el, hProps, factor.from.x, el.from );
			el.to = $.effects.setTransition( el, hProps, factor.to.x, el.to );
		}
	}

	// Scale the content
	if ( scale === "content" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			props = props.concat( cProps ).concat( props2 );
			el.from = $.effects.setTransition( el, cProps, factor.from.y, el.from );
			el.to = $.effects.setTransition( el, cProps, factor.to.y, el.to );
		}
	}

	$.effects.save( el, props );
	el.show();
	$.effects.createWrapper( el );
	el.css( "overflow", "hidden" ).css( el.from );

	// Adjust
	if (origin) { // Calculate baseline shifts
		baseline = $.effects.getBaseline( origin, original );
		el.from.top = ( original.outerHeight - el.outerHeight() ) * baseline.y;
		el.from.left = ( original.outerWidth - el.outerWidth() ) * baseline.x;
		el.to.top = ( original.outerHeight - el.to.outerHeight ) * baseline.y;
		el.to.left = ( original.outerWidth - el.to.outerWidth ) * baseline.x;
	}
	el.css( el.from ); // set top & left

	// Animate
	if ( scale === "content" || scale === "both" ) { // Scale the children

		// Add margins/font-size
		vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps);
		hProps = hProps.concat([ "marginLeft", "marginRight" ]);
		props2 = props0.concat(vProps).concat(hProps);

		el.find( "*[width]" ).each( function() {
			var child = $( this ),
				c_original = {
					height: child.height(),
					width: child.width(),
					outerHeight: child.outerHeight(),
					outerWidth: child.outerWidth()
				};
			if (restore) {
				$.effects.save(child, props2);
			}

			child.from = {
				height: c_original.height * factor.from.y,
				width: c_original.width * factor.from.x,
				outerHeight: c_original.outerHeight * factor.from.y,
				outerWidth: c_original.outerWidth * factor.from.x
			};
			child.to = {
				height: c_original.height * factor.to.y,
				width: c_original.width * factor.to.x,
				outerHeight: c_original.height * factor.to.y,
				outerWidth: c_original.width * factor.to.x
			};

			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				child.from = $.effects.setTransition( child, vProps, factor.from.y, child.from );
				child.to = $.effects.setTransition( child, vProps, factor.to.y, child.to );
			}

			// Horizontal props scaling
			if ( factor.from.x !== factor.to.x ) {
				child.from = $.effects.setTransition( child, hProps, factor.from.x, child.from );
				child.to = $.effects.setTransition( child, hProps, factor.to.x, child.to );
			}

			// Animate children
			child.css( child.from );
			child.animate( child.to, o.duration, o.easing, function() {

				// Restore children
				if ( restore ) {
					$.effects.restore( child, props2 );
				}
			});
		});
	}

	// Animate
	el.animate( el.to, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			if ( el.to.opacity === 0 ) {
				el.css( "opacity", el.from.opacity );
			}
			if ( mode === "hide" ) {
				el.hide();
			}
			$.effects.restore( el, props );
			if ( !restore ) {

				// we need to calculate our new positioning based on the scaling
				if ( position === "static" ) {
					el.css({
						position: "relative",
						top: el.to.top,
						left: el.to.left
					});
				} else {
					$.each([ "top", "left" ], function( idx, pos ) {
						el.css( pos, function( _, str ) {
							var val = parseInt( str, 10 ),
								toRef = idx ? el.to.left : el.to.top;

							// if original was "auto", recalculate the new value from wrapper
							if ( str === "auto" ) {
								return toRef + "px";
							}

							return val + toRef + "px";
						});
					});
				}
			}

			$.effects.removeWrapper( el );
			done();
		}
	});

};


/*!
 * jQuery UI Effects Scale 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/scale-effect/
 */


var effectScale = $.effects.effect.scale = function( o, done ) {

	// Create element
	var el = $( this ),
		options = $.extend( true, {}, o ),
		mode = $.effects.setMode( el, o.mode || "effect" ),
		percent = parseInt( o.percent, 10 ) ||
			( parseInt( o.percent, 10 ) === 0 ? 0 : ( mode === "hide" ? 0 : 100 ) ),
		direction = o.direction || "both",
		origin = o.origin,
		original = {
			height: el.height(),
			width: el.width(),
			outerHeight: el.outerHeight(),
			outerWidth: el.outerWidth()
		},
		factor = {
			y: direction !== "horizontal" ? (percent / 100) : 1,
			x: direction !== "vertical" ? (percent / 100) : 1
		};

	// We are going to pass this effect to the size effect:
	options.effect = "size";
	options.queue = false;
	options.complete = done;

	// Set default origin and restore for show/hide
	if ( mode !== "effect" ) {
		options.origin = origin || [ "middle", "center" ];
		options.restore = true;
	}

	options.from = o.from || ( mode === "show" ? {
		height: 0,
		width: 0,
		outerHeight: 0,
		outerWidth: 0
	} : original );
	options.to = {
		height: original.height * factor.y,
		width: original.width * factor.x,
		outerHeight: original.outerHeight * factor.y,
		outerWidth: original.outerWidth * factor.x
	};

	// Fade option to support puff
	if ( options.fade ) {
		if ( mode === "show" ) {
			options.from.opacity = 0;
			options.to.opacity = 1;
		}
		if ( mode === "hide" ) {
			options.from.opacity = 1;
			options.to.opacity = 0;
		}
	}

	// Animate
	el.effect( options );

};


/*!
 * jQuery UI Effects Puff 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/puff-effect/
 */


var effectPuff = $.effects.effect.puff = function( o, done ) {
	var elem = $( this ),
		mode = $.effects.setMode( elem, o.mode || "hide" ),
		hide = mode === "hide",
		percent = parseInt( o.percent, 10 ) || 150,
		factor = percent / 100,
		original = {
			height: elem.height(),
			width: elem.width(),
			outerHeight: elem.outerHeight(),
			outerWidth: elem.outerWidth()
		};

	$.extend( o, {
		effect: "scale",
		queue: false,
		fade: true,
		mode: mode,
		complete: done,
		percent: hide ? percent : 100,
		from: hide ?
			original :
			{
				height: original.height * factor,
				width: original.width * factor,
				outerHeight: original.outerHeight * factor,
				outerWidth: original.outerWidth * factor
			}
	});

	elem.effect( o );
};


/*!
 * jQuery UI Effects Pulsate 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/pulsate-effect/
 */


var effectPulsate = $.effects.effect.pulsate = function( o, done ) {
	var elem = $( this ),
		mode = $.effects.setMode( elem, o.mode || "show" ),
		show = mode === "show",
		hide = mode === "hide",
		showhide = ( show || mode === "hide" ),

		// showing or hiding leaves of the "last" animation
		anims = ( ( o.times || 5 ) * 2 ) + ( showhide ? 1 : 0 ),
		duration = o.duration / anims,
		animateTo = 0,
		queue = elem.queue(),
		queuelen = queue.length,
		i;

	if ( show || !elem.is(":visible")) {
		elem.css( "opacity", 0 ).show();
		animateTo = 1;
	}

	// anims - 1 opacity "toggles"
	for ( i = 1; i < anims; i++ ) {
		elem.animate({
			opacity: animateTo
		}, duration, o.easing );
		animateTo = 1 - animateTo;
	}

	elem.animate({
		opacity: animateTo
	}, duration, o.easing);

	elem.queue(function() {
		if ( hide ) {
			elem.hide();
		}
		done();
	});

	// We just queued up "anims" animations, we need to put them next in the queue
	if ( queuelen > 1 ) {
		queue.splice.apply( queue,
			[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );
	}
	elem.dequeue();
};


/*!
 * jQuery UI Effects Shake 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 */


var effectShake = $.effects.effect.shake = function( o, done ) {

	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
		mode = $.effects.setMode( el, o.mode || "effect" ),
		direction = o.direction || "left",
		distance = o.distance || 20,
		times = o.times || 3,
		anims = times * 2 + 1,
		speed = Math.round( o.duration / anims ),
		ref = (direction === "up" || direction === "down") ? "top" : "left",
		positiveMotion = (direction === "up" || direction === "left"),
		animation = {},
		animation1 = {},
		animation2 = {},
		i,

		// we will need to re-assemble the queue to stack our animations in place
		queue = el.queue(),
		queuelen = queue.length;

	$.effects.save( el, props );
	el.show();
	$.effects.createWrapper( el );

	// Animation
	animation[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance;
	animation1[ ref ] = ( positiveMotion ? "+=" : "-=" ) + distance * 2;
	animation2[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance * 2;

	// Animate
	el.animate( animation, speed, o.easing );

	// Shakes
	for ( i = 1; i < times; i++ ) {
		el.animate( animation1, speed, o.easing ).animate( animation2, speed, o.easing );
	}
	el
		.animate( animation1, speed, o.easing )
		.animate( animation, speed / 2, o.easing )
		.queue(function() {
			if ( mode === "hide" ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		});

	// inject all the animations we just queued to be first in line (after "inprogress")
	if ( queuelen > 1) {
		queue.splice.apply( queue,
			[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );
	}
	el.dequeue();

};


/*!
 * jQuery UI Effects Slide 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 */


var effectSlide = $.effects.effect.slide = function( o, done ) {

	// Create element
	var el = $( this ),
		props = [ "position", "top", "bottom", "left", "right", "width", "height" ],
		mode = $.effects.setMode( el, o.mode || "show" ),
		show = mode === "show",
		direction = o.direction || "left",
		ref = (direction === "up" || direction === "down") ? "top" : "left",
		positiveMotion = (direction === "up" || direction === "left"),
		distance,
		animation = {};

	// Adjust
	$.effects.save( el, props );
	el.show();
	distance = o.distance || el[ ref === "top" ? "outerHeight" : "outerWidth" ]( true );

	$.effects.createWrapper( el ).css({
		overflow: "hidden"
	});

	if ( show ) {
		el.css( ref, positiveMotion ? (isNaN(distance) ? "-" + distance : -distance) : distance );
	}

	// Animation
	animation[ ref ] = ( show ?
		( positiveMotion ? "+=" : "-=") :
		( positiveMotion ? "-=" : "+=")) +
		distance;

	// Animate
	el.animate( animation, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			if ( mode === "hide" ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		}
	});
};


/*!
 * jQuery UI Effects Transfer 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/transfer-effect/
 */


var effectTransfer = $.effects.effect.transfer = function( o, done ) {
	var elem = $( this ),
		target = $( o.to ),
		targetFixed = target.css( "position" ) === "fixed",
		body = $("body"),
		fixTop = targetFixed ? body.scrollTop() : 0,
		fixLeft = targetFixed ? body.scrollLeft() : 0,
		endPosition = target.offset(),
		animation = {
			top: endPosition.top - fixTop,
			left: endPosition.left - fixLeft,
			height: target.innerHeight(),
			width: target.innerWidth()
		},
		startPosition = elem.offset(),
		transfer = $( "<div class='ui-effects-transfer'></div>" )
			.appendTo( document.body )
			.addClass( o.className )
			.css({
				top: startPosition.top - fixTop,
				left: startPosition.left - fixLeft,
				height: elem.innerHeight(),
				width: elem.innerWidth(),
				position: targetFixed ? "fixed" : "absolute"
			})
			.animate( animation, o.duration, o.easing, function() {
				transfer.remove();
				done();
			});
};



}));
