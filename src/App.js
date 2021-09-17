import React from 'react';
import { Paper, TextField, Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Otp from './Components/OtpVerification';

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      pno: '',
      otpShow: false,
      otp: ''
    };
  }

  render() {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(1 31 75)',
        height: '100vh'
      }}>
        <Paper elevation={4} style={{ padding: 20, marginBottom: 60 }}>
          {!this.state.otpShow ? <h3 style={{ marginLeft: 10, color: 'rgb(3 30 70)' }}>Phone Verification</h3> : <IconButton onClick={() => {
            this.setState({ otpShow: false, otp: '' });
          }} size="small"><ArrowBackIcon /></IconButton>}
          {!this.state.otpShow ? <p style={{ marginLeft: 10 }}>Enter Mobile Number</p> : <h3>Enter the OTP</h3>}
          {this.state.otpShow ? <p>A One Time Password has been sent to your phone number for verification puposes.</p> : null}
          <div>
            {!this.state.otpShow ? <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around' }}>
              <TextField
                disabled
                id="filled-disabled"
                label="Country Code"
                defaultValue="+91"
                variant="filled"
              />
              <div className='pt-2'>
                <TextField id="phone" label="Phone" color="secondary" value={this.state.pno}
                  onChange={e => {
                    if ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9') || !e.target.value) {
                      this.setState({ pno: e.target.value });
                    }
                  }} />
              </div>
            </div> : <Otp otp={this.state.otp} setOtp={val => this.setState({ otp: val })} />}
            {this.state.otpShow ? <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 }}>
              <Button onClick={() => null} color="primary" style={{ textTransform: 'none', fontSize: 15 }}>Resend OTP</Button>
            </div> : null}
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
              <Button
                variant="contained"
                disabled={(this.state.pno.length !== 10) || (this.state.code === null) || !isNumeric(this.state.pno) || (this.state.otpShow && this.state.otp.length !== 6)}
                color="secondary"
                style={{
                  color: 'white',
                  marginLeft: 'auto',
                  textTransform: 'none'
                }}
                onClick={() => {
                  if (this.state.otpShow) {
                  } else {
                    this.setState({ otpShow: true });
                  }
                }}>
                Verify Phone Number
              </Button>
            </div>
            {!this.state.otpShow ? <p className='pt-5'>By tapping Verify an SMS may be sent. Message & data rates may apply.</p> : null}

          </div>
        </Paper>
      </div>
    );
  }
}