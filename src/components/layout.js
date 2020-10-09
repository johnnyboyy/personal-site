/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./header";
import "./layout.css";

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<>
			<Header siteTitle={data.site.siteMetadata?.title || `Title`} />
			<Container fluid="md">
				<Row>
					<Col>
						<main>{children}</main>
					</Col>
				</Row>
				<Row>
					<footer
						style={{
							marginTop: `2rem`,
						}}>
						© {new Date().getFullYear()}, Built with
						{` `}
						<a href="https://www.gatsbyjs.com">Gatsby</a>
					</footer>
				</Row>
			</Container>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
