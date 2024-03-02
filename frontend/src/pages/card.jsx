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
    <Card className=' pb-2 ' sx={{ width :{md: 200, lg: 370},  borderRadius:"10px", background:"rgb(147 197 253)"}}>
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
        <Button size="small">Check Here</Button>
      </CardActions>
    </Card>
    </div>
  );
}
