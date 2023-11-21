import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CustomAccordion = ({ heading, children, ...rest }) => {
    return (
        <Accordion
            disableGutters
            elevation={0}
            square
            sx={{
                borderLeft: 'none',
                borderRight: 'none',
                width: '100%',
                borderTop: `1px solid #e4e4e4`,
                '&:not(:last-child)': {
                    borderBottom: 0
                },
                '&:before': {
                    display: 'none'
                }
            }}
            {...rest}
        >
            <AccordionSummary
                expandIcon={<PlayArrowIcon sx={{ fontSize: '1rem', color: '#000' }} />}
                aria-controls="panel1d-content"
                sx={{
                    backgroundColor: '',
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(90deg)'
                    },
                    '& .MuiAccordionSummary-content': {
                        marginLeft: '1rem'
                    }
                }}
            >
                {heading}
            </AccordionSummary>
            <AccordionDetails
                sx={{ padding: '2rem 1rem 2rem 3rem', borderTop: '1px solid rgba(0, 0, 0, .125)', textAlign: 'left' }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
