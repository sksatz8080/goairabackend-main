import {  Box, Container, styled, Grid, Card, Typography, CardContent, Avatar } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { red } from '@mui/material/colors';
import { Doughnut } from 'react-chartjs-2';
import LocalTaxiSharpIcon from '@mui/icons-material/LocalTaxiSharp';
import TwoWheelerSharpIcon from '@mui/icons-material/TwoWheelerSharp';
import AirportShuttleSharpIcon from '@mui/icons-material/AirportShuttleSharp';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { CardHeader, colors, Divider } from '@mui/material';

const RootStyle = styled(Card)(( theme: Theme ) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.contrastText,
  backgroundColor: theme.palette.info.light
}));
       

      

const DashboardPage = () => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 7.5, 22 ,7.5],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[300]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Car', 'Bike', 'Auto' , 'Ambulance']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Car',
      value: 63,
      icon: LocalTaxiSharpIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Auto',
      value: 7.5,
      icon: TabletIcon,
      color: colors.red[600]
    },
    {
      title: 'Bike',
      value: 23,
      icon: TwoWheelerSharpIcon,
      color: colors.orange[600]
    },
    {
      title: 'Ambulance',
      value: 7.5,
      icon: AirportShuttleSharpIcon,
      color: colors.green[300]
    }
  ];
  return(
  
  <Box
    sx={{
      color:"primary" ,
      borderColor: "secondary",
      minHeight: '100%',
      py: 3
    }}
  >
    
    <Container maxWidth={false} >
      <Grid
        container
        spacing={3}
      >
       
 
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Card
    //sx={{ height: '100%' }}
    
  >
    <CardContent>
      <Grid
        container
        spacing={3}
       // sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            Total Riders
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            41
          </Typography>
        </Grid>
        
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
       
        
        <Typography
          color="textSecondary"
          variant="caption"
        >
    
        </Typography>
      </Box>
    </CardContent>
  </Card>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
           <Card >
    <CardContent>
      <Grid
        container
        spacing={3}
        //sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL Drivers
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
           21
          </Typography>
        </Grid>
        <Grid item>
          
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <Typography
          variant="body2"
          // sx={{
          //   color: green[900],
          //   mr: 1
          // }}
        >
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
        </Typography>
      </Box>
    </CardContent>
  </Card>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Card
   // sx={{ height: '100%' }}
    
  >
    <CardContent>
      <Grid
        container
        spacing={3}
       // sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            Approved Drivers
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            5
          </Typography>
        </Grid>
        <Grid item>
         
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        
      </Box>
    </CardContent>
  </Card>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Card>
    <CardContent>
      <Grid
        container
        spacing={3}
       // sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            Revenue
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            $23,200
          </Typography>
        </Grid>
        <Grid item>
          
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  
        </Grid>
 
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          {/* <Sales /> */}
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <Card >
      <CardHeader title="Vehicle Types" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
           // options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          {/* <LatestProducts sx={{ height: '100%' }} /> */}
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          {/* <LatestOrders /> */}
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
    
}

export default DashboardPage;