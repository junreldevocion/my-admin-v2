import React, {useState} from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Avatar from '@/img/avatars/avatar.jpg'
import api from 'src/util/api'
import {logOut} from 'src/util/auth'

interface NavbarProps {
	collapsed: boolean;
	setCollapsed: (a:boolean) => void;
	token: string;
  	username: string;
}

const Navbar: NextPage<NavbarProps> = ({collapsed, setCollapsed, token, username}) => {
	const [dropdownToggle, setDrodownToggle] = useState<boolean>(false);

	const dropdownToggler = (e: React.MouseEvent<HTMLElement>) : void => {
		e.preventDefault();
		setDrodownToggle(!dropdownToggle);
	}

	const toggler = (e: React.MouseEvent<HTMLElement>) : void => {
		e.preventDefault();
		setCollapsed(!collapsed);
	}
  return (
	<nav className="navbar navbar-expand navbar-light navbar-bg">
				<a className="sidebar-toggle js-sidebar-toggle" onClick={toggler}>
					<i className="hamburger align-self-center"></i>
				</a>
				<div className="navbar-collapse collapse">
					<ul className="navbar-nav navbar-align">
						<li className="nav-item dropdown">
							<a className="nav-icon dropdown-toggle d-inline-block d-sm-none"  href="#" data-bs-toggle="dropdown">
								<i className="align-middle" data-feather="settings"></i>
							</a>

							<a className="nav-link d-none d-sm-flex align-items-center py-0" href="#" data-bs-toggle="dropdown" onClick={dropdownToggler}>
								<Image 
									src={Avatar} 
									className="avatar img-fluid rounded"
									width={40}
									height={40}
									alt={'avatar'}
								/>		
							</a>
							<div className={`dropdown-menu dropdown-menu-end ${dropdownToggle ? 'show' : ''}`} data-bs-popper={`${dropdownToggle ? 'none' : ''}`}>
								<a className="dropdown-item" href="pages-profile.html">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
									Hi! {username} 
								</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#"
								onClick={
									(e) => {
										e.preventDefault(); 
										api().post('api/logout', {}, { headers: {"Authorization" : `Bearer ${token}`} })
										.then(() => logOut());
									}}
								>Log out</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
  )
}

export default Navbar