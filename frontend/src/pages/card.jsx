import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({Title, desc, imgUrl}) {
  return (
<div>
    <a href="#">
    <Card sx={{ width : 370, height:430, border:"2px solid black", borderRadius:"10px"}}>

      <CardMedia
        sx={{ height: 240 }}
        image={imgUrl}
        title={Title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </a>
    </div>
  );
}
