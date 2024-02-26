import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import './ContentList.css'
function ContentList({ content ,showBtn}) {
 
  const items = content.split(',');

  return (
    <List className={showBtn?'':'none'}>
      {items.map((item,idx) => (
        <ListItem key={idx}>
          <ListItemText  primary={item} />
        </ListItem>
      ))}
    </List>
  );
}

export default ContentList;
