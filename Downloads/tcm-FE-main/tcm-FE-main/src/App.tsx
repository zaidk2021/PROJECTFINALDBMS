import React from 'react';
import { Button, Tab, Tabs } from '@material-ui/core';
import { Routes, Route, Link, useParams, useLocation, matchPath, useNavigate } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import ForgotPassword from './components/ForgotPassword';
import Library from './components/LibraryItem/Library';
import Profile from './components/Profile';
import LibraryCrud from './components/LibraryCrud/LibraryCrud';
import ExpertLibrary from './components/ExpertLibrary/ExpertLibrary';
import CustomerLibrary from './components/CustomerLibrary/CustomerLibrary';
import AuditHistory from './components/AuditHistory/AuditHistory';
import TaskCustomers from './components/Tasks/TaskCustomers';
import ExpertsList from './components/ExpertsList/ExpertsList';
import NewUsers from './components/Users/NewUsers';
import Companies from './components/Companies';
import CompanyLibrary from './components/Companies/CompanyLibrary';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import Register from './components/Register';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import setAuthToken from './utils/setAuthToken';
import ChangeLogs from './components/ChangeLogs';

const App = () => {
    const navigate = useNavigate();

    const { pathname } = useLocation();

    return (
        <div className="App">
            <div style={{ width: '100%' }}>
                {pathname !== '/' && <MyTabs />}{' '}
                <div
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 2,
                        width: localStorage.getItem('user') ? '215px' : '120px',
                        padding: '2px'
                    }}
                    className="d-flex align-items-center"
                >
                    {localStorage.getItem('user') && (
                        <Button
                            onClick={() => {
                                localStorage.removeItem('user');
                                setAuthToken(false);
                                navigate('/');
                            }}
                            className="me-3"
                        >
                            Logout <ExitToAppIcon className="ms-2" />
                        </Button>
                    )}
                </div>
            </div>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/" element={<Login />}></Route>
                {/* <Route path="/forgot-password" element={<ForgotPassword />}></Route> */}
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                <Route path="/reset-password" element={<ResetPassword />}></Route>
                <Route path="/homepage" element={<Homepage />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/library/:id" element={<LibraryWrapper />}></Route>
                <Route path="/library" element={<LibraryCrud />}></Route>
                <Route path="/all-companies/library/:id" element={<CompanyLibrary />}></Route>
                <Route path="/expert-library" element={<ExpertLibrary />}></Route>
                <Route path="/customer-library" element={<CustomerLibrary />}></Route>
                <Route path="/tasks" element={<TaskCustomers />}></Route>
                <Route path="/tasks/:id" element={<TaskCustomers />}></Route>
                <Route path="/tasks/:customerUserId/:libraryId" element={<TaskCustomers />}></Route>
                <Route path="/audit-history" element={<AuditHistory />}></Route>
                <Route path="/audit-history/:id" element={<AuditHistory />}></Route>
                <Route path="/all-experts" element={<ExpertsList />}></Route>
                <Route path="/users/:id" element={<NewUsers />}></Route>
                <Route path="/users" element={<NewUsers />}></Route>
                <Route path="/all-companies" element={<Companies />}></Route>
                <Route path="/change-logs" element={<ChangeLogs />}></Route>
            </Routes>
        </div>
    );
};

function LibraryWrapper() {
    let { id } = useParams();
    return <Library id={Number(id)} />;
}

function MyTabs() {
    const routeMatch = useRouteMatch([
        '/register',
        '/',
        '/homepage',
        '/forgot-password',
        '/reset-password',
        '/profile',
        '/library',
        '/expert-library',
        '/customer-library',
        '/library/:id',
        '/all-experts',
        '/users',
        '/all-companies',
        '/tasks/:id',
        '/change-logs'
    ]);

    const currentTab = routeMatch ? (routeMatch.pattern ? routeMatch.pattern.path : '') : '';
    // const handleTab = () => {
    //     let anchor = document.createElement('a');
    //     console.log('CLickeddd', anchor);
    //     anchor.setAttribute(
    //         'href',
    //         'https://cyber-tire-524.notion.site/Release-Notes-The-Compliance-Manager-1a1f6b2bc87e41a3bc557ff4668805bc'
    //     );
    //     anchor.setAttribute('target', '_blank');
    //     anchor.click();
    // };

    // userRole === 'SysAdmin' && <Tab label="Change Logs" onClick={() => handleTab()} />

    const userStr = localStorage.getItem('user');
    let user = null as { user_info: { role: string; id: number }; access_token: string } | null;
    if (userStr) user = JSON.parse(userStr);
    if (user && user.access_token) {
        const { role: userRole, id: userId } = user.user_info;
        var library = {
            SysAdmin: '/library',
            Expert: '/expert-library',
            'Customer Admin': '/customer-library',
            'Customer User': '/customer-library'
        };
        return (
            <>
                <Tabs style={{ marginBottom: '80px' }} value={currentTab}>
                    <Tab label="Profile" value="/profile" to="profile" component={Link} />
                    <Tab label="Homepage" value="/homepage" to="/homepage" component={Link} />
                    <Tab
                        label="Library"
                        value={library[user.user_info.role]}
                        to={library[user.user_info.role]}
                        component={Link}
                    />
                    {userRole === 'SysAdmin' && (
                        <Tab label="Experts List" value="/all-experts" to="all-experts" component={Link} />
                    )}
                    {userRole === 'SysAdmin' && (
                        <Tab label="Companies List" value="/all-companies" to="all-companies" component={Link} />
                    )}
                    {userRole === 'SysAdmin' && (
                        <Tab label="Change Logs" value="/change-logs" to="/change-logs" component={Link} />
                    )}
                    {userRole === 'Customer Admin' && <Tab label="Users" value="/users" to="/users" component={Link} />}
                    {(userRole === 'Customer Admin' || userRole === 'Customer User') && (
                        <Tab label="Tasks" value={`/tasks/${userId}`} to={`/tasks/${userId}`} component={Link} />
                    )}
                </Tabs>
            </>
        );
    } else {
        return (
            <Tabs value={currentTab}>
                <Tab label="Login" value="/" to="/" component={Link} />
            </Tabs>
        );
    }
}

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];

        const possibleMatch = matchPath(pattern, pathname);

        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export default App;
