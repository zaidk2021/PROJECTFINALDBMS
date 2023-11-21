// import React, { useEffect, useState } from 'react';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleIcon from '@mui/icons-material/Circle';
import AuditTrailService from '../../services/audit-trail.service';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        }
    })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ChangeHistoryIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function AuditTrail() {
    const [expanded, setExpanded] = React.useState<string | false>('');
    const [historyData, setHistoryData] = React.useState<any[]>([]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        console.log(newExpanded);
        console.log(panel);
        setExpanded(newExpanded ? panel : false);
    };

    const fetchLibraryHistory = () => {
        AuditTrailService.getLibraryHistory(1)
            .then(data => {
                // console.log(data);
                setHistoryData(data);
            })
            .catch(error => {
                // console.log(error);
            });
    };
    useEffect(() => {
        fetchLibraryHistory();
    }, []);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', mx: 2 }}>
                <Typography variant="h6" component="h2">
                    Change Request History Details for Library100
                </Typography>
            </Box>
            <hr className="solid" style={{ margin: '10px 15px' }}></hr>
            <Grid container sx={{ textAlign: 'left', padding: '10px 15px' }}>
                <Grid item xs={1.5}>
                    <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 15 }}>Created:</Box>
                    <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 15 }}>Last Updated:</Box>
                    <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 15 }}>Update Count:</Box>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ fontWeight: 'regular', m: 1, fontSize: 15 }}>29 Nov 2021 14:35:13 by Adrian Gill</Box>
                    <Box sx={{ fontWeight: 'regular', m: 1, fontSize: 15 }}>4 Dec 2021 14:35:13</Box>
                    <Box sx={{ fontWeight: 'regular', m: 1, fontSize: 15 }}>7 (7 audited)</Box>
                </Grid>
            </Grid>
            {console.log(historyData)}
            {historyData &&
                historyData.map((item: any) => (
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>
                                    30 Nov 2021 13:34:49{' '}
                                    <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Updated by</Box> Samantha Ferrar
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container sx={{ paddingX: 4 }}>
                                    <Grid container direction="row" alignItems="left" sx={{ my: 0.5 }}>
                                        <Grid item>
                                            <CircleIcon style={{ fontSize: 7, marginRight: '10px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{ fontSize: 14 }}>
                                                Last activity was 1 Day 2 Hours 11 Minutes earlier
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="left">
                                        <Grid item>
                                            <CircleIcon style={{ fontSize: 7, marginRight: '10px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{ fontSize: 14 }}>
                                                Created 3 Days 1 Hour 1 Minute earlier
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ textAlign: 'left', padding: '10px 15px' }}>
                                        <Grid item xs={4} sx={{ px: 0.5 }}>
                                            <Typography
                                                align="center"
                                                sx={{ fontSize: 14, backgroundColor: '#99A3A4', paddingY: '5px' }}
                                            >
                                                Updated Fields
                                            </Typography>
                                            <Typography align="center" sx={{ fontSize: 14, marginY: '5px' }}>
                                                {item.field}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sx={{ px: 0.5 }}>
                                            <Typography
                                                align="center"
                                                sx={{ fontSize: 14, backgroundColor: '#99A3A4', paddingY: '5px' }}
                                            >
                                                Before
                                            </Typography>
                                            <Typography align="center" sx={{ fontSize: 14, marginY: '5px' }}>
                                                {/* {item.previous-value} */}
                                                Previous Value
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sx={{ px: 0.5 }}>
                                            <Typography
                                                align="center"
                                                sx={{ fontSize: 14, backgroundColor: '#99A3A4', paddingY: '5px' }}
                                            >
                                                After
                                            </Typography>
                                            <Typography align="center" sx={{ fontSize: 14, marginY: '5px' }}>
                                                Updated new format of medical
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="left" sx={{ my: 0.5 }}>
                                        <Grid item>
                                            <Typography style={{ fontSize: 14 }}>
                                                Submit by{' '}
                                                <Box sx={{ fontWeight: 'bold', display: 'inline', fontSize: 14 }}>
                                                    User Request Specification
                                                </Box>{' '}
                                                Adrian Gill
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
        </Box>
    );
}
