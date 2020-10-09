import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const LinkConnecter = ({ href, children, ...rest }) => {
	const linkProps = { ...rest, to: href };

	return <Link {...linkProps}>{children}</Link>;
};
const activeStyles = {
	color: "rebeccapurple",
};

const Header = ({ siteTitle }) => {
	const [active, setActive] = useState("home");
	const activeSetter = (key) => () => setActive(key);

	return (
		<Navbar expand="md" bg="dark" variant="dark">
			<Container fluid={"md"}>
				<Navbar.Brand>
					<Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
						{siteTitle}
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav
						activeKey="home"
						defaultActiveKey="home"
						onSelect={(selectedKey) => {
							console.log({ selectedKey });
							setActive(selectedKey);
						}}>
						<Nav.Item>
							<Nav.Link
								style={active === "home" ? activeStyles : {}}
								as={LinkConnecter}
								href="/"
								eventKey="home"
								onClick={activeSetter("home")}>
								Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								style={active === "portfolio" ? activeStyles : {}}
								as={LinkConnecter}
								href="/portfolio"
								eventKey="portfolio"
								onClick={activeSetter("portfolio")}>
								Portfolio
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								style={active === "contact" ? activeStyles : {}}
								as={LinkConnecter}
								href="/contact"
								eventKey="contact"
								onClick={activeSetter("contact")}>
								Contact
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: ``,
};

export default Header;
