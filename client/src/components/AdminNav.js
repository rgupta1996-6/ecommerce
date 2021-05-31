import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/updatepassword" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Sales</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Current month
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Last quarter
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Year-end sale
              </a>
            </li>
          </ul>
    </div>
  </nav>
);

export default AdminNav;
