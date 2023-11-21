import * as React from 'react';
import { Typography } from '@mui/material';
import book from '../images/book-image.svg';
import CustomAccordion from './Common/CustomAccordion';

const ChangeLogs = () => {
    return (
        <>
            <main className="">
                <div
                    style={{ width: '50%' }}
                    className="m-4  mx-auto  d-flex flex-column justify-content-center align-items-center"
                >
                    <img src={book} alt="book image" className="me-auto" style={{ height: '78px', width: '78px' }} />
                    <h2 className="me-auto my-4  fw-bolder ">Release Notes - The Compliance Manager</h2>

                    <CustomAccordion
                        heading={
                            <p className="h5 fw-bold">
                                Release v1.3
                                <small className="text-muted">&nbsp; @January 12, 2023</small>
                            </p>
                        }
                    >
                        <p className="h5">UI Related</p>

                        <ol type="1" className="list-group  mb-4 ps-4">
                            <li className="border-0 ps-2 mb-2">
                                Whenever a library item is made inapplicable, its children do not become inapplicable -
                                Bug resolved.
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Tasks added as a separate tab, for navigation to task management - applicable only for
                                Company Admn & Company User
                            </li>
                        </ol>

                        <p className="h5">Task Management</p>
                        <ol type="1" className="list-group mb-4 ps-4">
                            <li className="border-0 ps-2 mb-2">
                                Tasks can be added from the main library interface itself by “Customer Admin” and
                                “Customer User” roles.
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                If Tasks are added from the main library interface, library item and library data come
                                pre-filled and is read-only.
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Library Item selection in task Management will now only shows library items of 3 levels
                                (Chapter, Sub-Chapter, and Article)
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                For Library item selection in Task Management, Library items are shown in tree view, in
                                order of hierarchy.
                            </li>
                        </ol>

                        <p className="h5">General</p>
                        <ol className="list-group ps-4">
                            <li className="border-0 ps-2 mb-2">
                                When library item applicability is selected, repeated confirmation pop-ups will not
                                appear. The applicability will be saved only when the “Done” button is pressed.
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Applicability doesn’t work properly, deselect all functionality does not work - Bug
                                Resolved.
                            </li>
                            <li className="border-0 ps-2 mb-2">Server side pagination was added to each table</li>
                        </ol>
                    </CustomAccordion>

                    <CustomAccordion
                        heading={
                            <p className="h5 fw-bold">
                                Release v1.2
                                <small className="text-muted">&nbsp; @January 3, 2023</small>
                            </p>
                        }
                    >
                        <p className="h5">UI Related</p>

                        <ol type="1" className="list-group mb-4 ps-4">
                            <li className="border-0 ps-2 mb-2">
                                As a temporary measure, release notes have been added as an HTML link. Same will be
                                implemented within the application.
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                All table designs, default rows, and pagination have been made consistent.
                            </li>
                            <li className="border-0 ps-2 mb-2">All action button placements have been made uniform.</li>
                            <li className="border-0 ps-2 mb-2">Title placement made uniform.</li>
                            <li className="border-0 ps-2 mb-2">
                                To add users, a new button has been added, and the earlier approach of clicking the
                                company name to see the user list has been removed.
                            </li>
                        </ol>

                        <p className="h5">Registration Related</p>
                        <ol type="1" className="list-group ps-4">
                            <li className="border-0 ps-2 mb-2">
                                Proper error not shown and form/modal closing abruptly - Bug Resolved
                            </li>
                            <li className="border-0 ps-2 mb-2">Company Admin Registration made a 2-Step Process</li>
                            <li className="border-0 ps-2 mb-2">
                                Error handling done properly, which would avoid company/user creation till the time
                                error is handled
                            </li>
                        </ol>
                    </CustomAccordion>
                    <CustomAccordion
                        heading={
                            <p className="h5 fw-bold">
                                Release v1.1
                                <small className="text-muted">&nbsp; @December 30, 2022 </small>
                            </p>
                        }
                    >
                        <p className="h5">Changes in Registration Process</p>
                        <ol type="1" className="list-group mb-4 ps-4">
                            <li className="border-0 ps-2 mb-2">
                                New fields added for registration of System Admin, Company Registration, Company Admin &
                                User Registration
                                <CustomAccordion
                                    style={{ border: 'none' }}
                                    heading={<Typography>Registration fields for Sys Admin</Typography>}
                                >
                                    <li className="list-group-item border-0">1. First Name (Mandatory)</li>
                                    <li className="list-group-item border-0">2. Last Name (Mandatory)</li>
                                    <li className="list-group-item border-0">3. Email (Mandatory)</li>
                                    <li className="list-group-item border-0">4. Phone Number</li>
                                    <li className="list-group-item border-0">5. Company Name</li>
                                    <li className="list-group-item border-0">6. Address</li>
                                    <li className="list-group-item border-0">7. Country</li>
                                </CustomAccordion>
                                <CustomAccordion
                                    style={{ border: 'none' }}
                                    heading={<Typography>Registration fields for Company</Typography>}
                                >
                                    <li className="list-group-item border-0">1. Company Code (Mandatory)</li>
                                    <li className="list-group-item border-0">2. Company Name (Mandatory)</li>
                                    <li className="list-group-item border-0">3. Company Phone</li>
                                    <li className="list-group-item border-0">4. Company Address</li>
                                    <li className="list-group-item border-0">5. Company Postal Code</li>
                                    <li className="list-group-item border-0">6. Country</li>
                                </CustomAccordion>
                                <CustomAccordion
                                    style={{ border: 'none' }}
                                    heading={
                                        <Typography> Registration fields for Company Admin/Company User</Typography>
                                    }
                                >
                                    <li className="list-group-item border-0">1. First Name (Mandatory)</li>
                                    <li className="list-group-item border-0">2. Last Name (Mandatory)</li>
                                    <li className="list-group-item border-0">3. Email (Mandatory)</li>
                                    <li className="list-group-item border-0">4. Phone Number</li>
                                    <li className="list-group-item border-0">5. Address</li>
                                    <li className="list-group-item border-0">6. Country</li>
                                </CustomAccordion>
                            </li>
                            {/* Hereeeeeee */}
                            <li className="border-0">
                                Mail sent on user registrations with default password as <b>tcm@123</b>.
                            </li>
                        </ol>

                        <p className="h5">Changes in User Management -</p>
                        <ol type="1" className="list-group mb-4 ps-4">
                            <li className="border-0 ps-2 mb-2">Edit/Update profile for System Admin</li>
                            <li className="border-0 ps-2 mb-2">
                                Edit/Update Expert user profile - functionality for System Admin
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Edit/Update Company/Company Admin/Company User details - functionality for System Admin
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Edit own profile - functionality for Company Admin/Company User
                            </li>
                            <li className="border-0 ps-2 mb-2">Active/Inactive Company Admin/Company User</li>
                            <li className="border-0 ps-2 mb-2">
                                Filter functionality for active/inactive/all users in a company.
                            </li>
                        </ol>

                        <p className="h5">General Changes</p>
                        <ol type="1" className="list-group ps-4">
                            <li className="border-0 ps-2 mb-2">
                                Assign libraries to expert view changed
                                <ol>
                                    <li className="list-group-item border-0 ">
                                        &nbsp; &nbsp;a.&nbsp; List has been made scrollable
                                    </li>
                                    <li className="list-group-item border-0 ">
                                        &nbsp; &nbsp;b.&nbsp; Libraries available for selection shown in format -
                                        [Identifier] - [Title]
                                    </li>
                                </ol>
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Forgot/Reset Password functionality implemented and tested end to end.
                            </li>
                            <li className="border-0 ps-2 mb-2">Cache not clearing after logout - bug resolved.</li>
                            <li className="border-0 ps-2 mb-2">
                                Login screen was seen even if the user was logged in - bug resolved.
                            </li>
                            <li className="border-0 ps-2 mb-2">Logout button added.</li>
                            <li className="border-0 ps-2 mb-2">
                                Register screen data fields entry redirecting to login screen - bug resolved.
                            </li>
                            <li className="border-0 ps-2 mb-2">
                                Registration page has now been removed, default landing page is now login page.
                            </li>
                        </ol>
                    </CustomAccordion>
                </div>
            </main>
        </>
    );
};

export default ChangeLogs;
