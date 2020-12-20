import React from 'react';
import './Footer.css';


const Footer = () => {
	return (
		<div className="contact-us">
			<div className="max-width pt-5 pb-3" id="contact">
				<div className="mt-5">
					<div className="row pb-5">
						<div className="col-md-5 col-lg-5 col-12">
							<h2 className="font-weight-bold pb-3">Want to know anything,<br />  send your message</h2>
							<p>We will try to reply you within short time</p>
						</div>
						<div className="col-md-7 col-lg-7 col-12 text-white">
							<form action="">
								<input type="text" placeholder="Your Name" className="input-style pl-3 mb-3" /><br />
								<input type="text" placeholder="Your Email" className="input-style pl-3 mb-3" /><br />
								<input type="text" placeholder="Your message" className="input-style textArea pl-3 mb-3" /><br />
								<button className="btn btn-outline-light mt-2">Send Message</button>
							</form>
						</div>
					</div>
					<p className="text-center"><small>@Copyright volunteer events {new Date().getFullYear()}</small></p>
				</div>
			</div>
		</div>

	);
};

export default Footer;