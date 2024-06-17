import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink.A400,
    '&:hover': {
      backgroundColor: alpha(pink.A400, theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink.A400,
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function RequiredButton({ checked, onChange }) {
  return (
    <div>
      <PinkSwitch {...label} checked={checked} onChange={onChange} /> required?
    </div>
  );
}
