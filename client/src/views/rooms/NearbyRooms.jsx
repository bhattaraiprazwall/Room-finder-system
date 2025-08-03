import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNearbyRooms } from '../../actions/room';
import { 
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert
} from '@mui/material';

const NearbyRooms = ({ 
  getNearbyRooms, 
  room: { rooms, loading, error } 
}) => {
  const [formData, setFormData] = useState({
    lat: '',
    lng: '',
    distance: 5
  });
  const [userLocation, setUserLocation] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { lat, lng, distance } = formData;

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          setFormData({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
            distance: 5
          });
        }
      } catch (err) {
        console.error('Geolocation error:', err);
        setSnackbarOpen(true);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await getNearbyRooms(
        parseFloat(lat), 
        parseFloat(lng), 
        parseFloat(distance)
      );
    } catch (err) {
      console.error('Search error:', err);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Find Rooms Nearby
      </Typography>
      
      <form onSubmit={onSubmit} style={{ marginBottom: '2rem' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Latitude"
              name="lat"
              value={lat}
              onChange={onChange}
              required
              type="number"
              inputProps={{ step: "0.000001" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Longitude"
              name="lng"
              value={lng}
              onChange={onChange}
              required
              type="number"
              inputProps={{ step: "0.000001" }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Distance (km)"
              name="distance"
              type="number"
              value={distance}
              onChange={onChange}
              inputProps={{ min: "0.1", step: "0.1" }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              style={{ height: '56px' }} // Match text field height
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {rooms?.data?.length > 0 ? (
            <Grid container spacing={3}>
              {rooms.data.map(room => (
                <Grid item key={room._id} xs={12} sm={6} md={4}>
                  <Card>
                    {room.photos?.[0] && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={room.photos[0]}
                        alt={room.title}
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {room.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {room.distance} km away
                      </Typography>
                      <Typography variant="body1">
                        ${room.price}/month
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {room.address}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center">
              No rooms found within {distance} km
            </Typography>
          )}
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="error"
          elevation={6}
          variant="filled"
        >
          {error?.msg || 'An error occurred. Please try again.'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = state => ({
  room: state.room
});

export default connect(mapStateToProps, { getNearbyRooms })(NearbyRooms);