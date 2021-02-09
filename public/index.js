import { nav, a, img, ul, section, li, div, text } from "https://cdn.skypack.dev/longwood";
import { createContext } from "https://cdn.skypack.dev/longwood-usestate";

const { provider: locationProvider, consumer: locationConsumer } = createContext();
const { provider: tabProvider, consumer: tabConsumer } = createContext();

const homeDefault = text("Home Default");
const workDefault = text("Work Default");
const linksDefault = text("Links Default");

const tabItem = ({ children, tab }) =>
	tabConsumer((state, setState) =>
		li(
			a({
				children,
				className: `${state === tab ? "is-active" : ""} navbar-item`,
				onclick: () => (typeof tab === "string" ? setState(tab) : true),
			})
		)
	);

const workTabs = ul(
	tabItem({ tab: "lelite", children: [text("L’élite")] }),
	tabItem({ tab: "collegefindme", children: [text("CollegeFindMe")] })
);

const linksTabs = ul(
	li(
		a({
			className: "is-link",
			target: "_blank",
			href: "https://github.com/johnnyboyy",
			children: [text("Github")],
		})
	),
	li(
		a({
			className: "is-link",
			target: "_blank",
			href: "https://www.linkedin.com/in/john-zdanis-67566285/ ",
			children: [text("LinkedIn")],
		})
	)
);

const homeTabs = ul(
	tabItem({ tab: "skills", children: [text("Skills")] }),
	tabItem({ tab: "interests", children: [text("Interests")] })
);

const sectionDefault = () =>
	locationConsumer((location) => {
		switch (location) {
			case "/":
				return homeDefault;
			case "work":
				return workDefault;
			case "links":
				return linksDefault;
			default:
				return text("Not Found!");
		}
	});

const content = tabConsumer((tab) => {
	switch (tab) {
		case "lelite":
			return text("Lelite!!!!");
		case "collegefindme":
			return text("CollegeFindMe!!!!");
		case "skills":
			return text("Skills!!!!");
		case "interests":
			return text("Interests");
		default:
			return sectionDefault();
	}
});

const tabs = locationConsumer((state) => {
	switch (state) {
		case "work":
			return workTabs;
		case "links":
			return linksTabs;
		default:
			return homeTabs;
	}
});

const navItem = ({ children, location }) =>
	locationConsumer((current, setLocation) =>
		tabConsumer((_tab, setTab) =>
			a({
				children,
				className: `${current === location ? "is-active" : ""} navbar-item`,
				onclick: (event) => {
					event.preventDefault();

					window.history.pushState({}, "", typeof location === "string" ? `/#${location}` : "/");

					setLocation(location);
					setTab(undefined);
				},
			})
		)
	);

const header = nav({
	className: "navbar",
	role: "navigation",
	"aria-label": "main navigation",
	children: [
		div({
			className: "navbar-brand",
			children: [
				navItem({
					children: [
						img({
							style: { marginRight: "5px", borderRadius: "1rem" },
							src:
								"https://avatars.githubusercontent.com/u/4052314?s=400&u=e51c20e38be89976ce563d8465c2c79ecddbd8e6&v=4",
						}),
						text("John Zdanis"),
					],
				}),
				a({
					role: "button",
					className: "navbar-burger",
					"aria-label": "menu",
					"aria-expanded": "false",
					"data-target": "mainNav",
				}),
			],
		}),
		div({
			className: "navbar-end",
			children: [
				navItem({ location: "work", children: [text("Work")] }),
				navItem({ location: "links", children: [text("Links")] }),
			],
		}),
	],
});

const body = div({
	className: "container",
	children: [div({ className: "columns", children: [content] })],
});

const footer = nav({
	className: "tabs is-boxed is-fullwidth",
	children: [
		div({
			className: "container",
			children: [tabs],
		}),
	],
});

const render = locationProvider(
	tabProvider(
		section({
			className: "hero is-dark is-fullheight",
			children: [
				div({ className: "hero-head", children: [header] }),
				div({ className: "hero-body", children: [body] }),
				div({ className: "hero-foot", children: [footer] }),
			],
		})
	)
);
render(document.getElementById("app"));
