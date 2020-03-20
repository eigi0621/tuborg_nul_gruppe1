class Smooth {

	constructor() {
		this.bindAll()

		this.ui = {
			el: document.querySelector('.js-scroll'),
			sections: document.querySelectorAll('.js-scroll-section'),
			heightEl: null
		}

		this.state = {
			total: this.ui.sections.length,
			scroll: {
				target: 0,
				current: 0,
				ease: 0.1
			},
			bounds: {
				height: window.innerHeight,
				scrollHeight: 0,
				threshold: 100,
			},
			isResizing: false
		}

		this.sections = null

		this.init()
	}

	bindAll() {
    ['onScroll', 'onResize', 'run']
		.forEach(fn => this[fn] = this[fn].bind(this))
	}

	run() {
		const {
			scroll
		} = this.state

		scroll.current += (scroll.target - scroll.current) * scroll.ease
		if (scroll.current < .1) scroll.current = 0

		this.transformSections()

		requestAnimationFrame(this.run)
	}

	transformSections() {
		const {
			total,
			isResizing,
			scroll
		} = this.state
		const translate = `translate3d(0, ${-scroll.current}px, 0)`

		for (let i = 0; i < total; i++) {
			const data = this.sections[i]
			const {
				el,
				bounds
			} = data
			const isVisible = this.isVisible(bounds)

			if (isVisible || isResizing) {
				Object.assign(data, {
					out: false
				})
				el.style.transform = translate
			} else if (!data.out) {
				Object.assign(data, {
					out: true
				})
				el.style.transform = translate
			}
		}
	}

	isVisible(bounds) {
		const {
			height,
			threshold
		} = this.state.bounds
		const {
			current
		} = this.state.scroll
		const {
			top,
			bottom
		} = bounds

		const start = top - current
		const end = bottom - current
		const isVisible = start < (threshold + height) && end > -threshold

		return isVisible
	}

	getSections() {
		if (!this.ui.sections) return
		this.sections = []

		this.ui.sections.forEach((el) => {
			el.style.transform = 'translate3d(0, 0, 0)'

			const {
				top,
				bottom
			} = el.getBoundingClientRect()
			const state = {
				el,
				bounds: {
					top,
					bottom,
				},
				out: true,
			}

			this.sections.push(state)
		})
	}

	setInitial() {
		const {
			el
		} = this.ui

		Object.assign(el.style, {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			overflow: 'hidden'
		})

		document.body.classList.add('is-smooth-scroll')
	}

	setFakeHeight() {
		const {
			total,
			bounds
		} = this.state

		if (!this.ui.heightEl) {
			this.ui.heightEl = document.createElement('div')
			this.ui.heightEl.classList.add('js-fake-scroll')
			document.body.appendChild(this.ui.heightEl)
		}

		const {
			bottom
		} = this.ui.sections[total - 1].getBoundingClientRect()
		bounds.scrollHeight = bottom

		this.ui.heightEl.style.height = `${bottom}px`
	}

	onScroll() {
		const {
			scroll
		} = this.state

		scroll.target = window.scrollY
	}

	onResize() {
		this.state.isResizing = true

		if (this.sections) {
			this.sections.forEach(({
				el,
				bounds
			}) => {
				el.style.transform = 'translate3d(0, 0, 0)'

				const {
					top,
					bottom
				} = el.getBoundingClientRect()

				bounds.top = top
				bounds.bottom = bottom
			})

			this.transformSections()
		}

		this.setFakeHeight()

		this.state.isResizing = false
	}

	addListeners() {
		window.addEventListener('scroll', this.onScroll)
		window.addEventListener('resize', this.onResize)
	}

	init() {
		this.setInitial()
		this.setFakeHeight()
		this.getSections()
		this.addListeners()

		requestAnimationFrame(this.run)
	}
}

new Smooth()
