import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const sidebar = () => {
	return (
		<Fragment>
			<div className="sidebar-wrapper">
				<nav id="sidebar">
					<ul className="list-unstyled components">
						<li>
							<Link to="/admin/dashboard">
								<i className="fa fa-tachometer-alt"></i> Dashboard
							</Link>
						</li>

						<li>
							<a
								href="#productSubMenu"
								data-toggle="collapse"
								aria-expanded="false"
								className="dropdown-toggle"
							>
								<i className="fa fa-product-hunt"></i> Products
							</a>
							<ul className="collapse list-unstyled" id="productSubMenu">
								<li>
									<Link to="/admin/products">
										<i className="fa fa-clipboard-list"></i> All
									</Link>
								</li>

								<li>
									<Link to="/admin/product">
										<i className="fa fa-plus"></i> Create
									</Link>
								</li>
							</ul>
						</li>

						<li>
							<Link to="/admin/orders">
								<i className="fa fa-shopping-basket"></i> Orders
							</Link>
						</li>

						<li>
							<Link to="/admin/users">
								<i className="fa fa-users"></i> Users
							</Link>
						</li>

            <li>
							<Link to="/admin/reviews">
								<i className="fa fa-star"></i> Reviews
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</Fragment>
	);
};

export default sidebar;
