import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const { useState , useEffect} = require("react");



const theme = createTheme();


const Policy = () => {
  const [status, setStatus] = useState(false);
  /*const handleChange = (event) => {
    accept ();
  };*/

  const accept = async () => {
    
    axios.patch(`http://localhost:8000/policy`,{accept:"true"},{
      headers: {
          "token" :  localStorage.getItem("token")
      }})
    .then((res) =>{
      console.log(res.data)
      setStatus(true);
    }
    )
  }
  useEffect(()=>{
    if(status){
      window.location.href=`/home`
    }
    
    });

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" >
            <Box>
          <Grid Item>
            <br></br>
            <Typography variant='h2' sx= {{ml:-100}}>
            Payment & Refund Policy
            </Typography>
            <Typography variant='body1' >
            The following Payment & Refund Policy (“Policy”) applies to all users and describes how your payments are made to HNFRM Ltd. 
            (“HNFRM”, “we”, “us” or “our”) in connection with our website, www.HNFRM.com, (“MMDSmart Site”),  
            the HNFRM software (“Application”), and other products and services provided on the HNFRM Site (all of the foregoing, collectively, “Services”).

            By using the Services, you are accepting the terms, conditions and policies described in this Policy, as may be amended from time to time. 
            Each time you use the Services and/or pay for a Service on the HNFRM Site, or our Applications, you agree and expressly consent to the following.
            </Typography>
          </Grid>
          
          <Grid Item>
            <Typography variant='h4' sx={{ml:-150}}>
            1.Payment policy
            </Typography>
            <Typography variant='subtitle1' >
               If you are under the age of 18 you need your parent or guardian to be involved in order to make any payments to HNFRM.
              All payments made by you to HNFRM are subject to HNFRM Terms of Service
            </Typography>

            <Typography variant='subtitle1' >
            Credit. You can purchase credits (“Credit”) using any payment method made available to you by HNFRM.
            You agree that you are not relying on the future availability of any feature or product offered through the Service in agreeing to or making payments hereunder. 
            </Typography>
            
            <Typography variant='subtitle1'>
            Credit Balance. Credit Balance is the amount of money that remains at your HNFRM account after you used the Services at HNFRM. 
            When you intend to use the Service, you must ensure that the Credit Balance of prepayment monies received from you by HNFRM is in credit. 
            The amount of such prepayments is at your sole discretion. The Service will be made available to you after the payment is received by a bank account of HNFRM.
            </Typography>

            <Typography variant='subtitle1'>
            Foreign Currency. If you pay with foreign currency, 
            you agree that the amount you are eventually credited may vary as a result of foreign currency conversion policies of our third-party payment processors, 
            which you can find at the relevant website or location where you make the actual purchase. 
            </Typography>
            
            <Typography variant='subtitle1'>
            Recurring Charges. If you purchase a service from HNFRM on a subscription basis, 
            you agree that this type of Service requires a recurring payment and all payments shall be made by the payment method and payment intervals selected by you at the time you initiate the purchase, 
            until you terminate the subscription.

            </Typography>

            <Typography variant='subtitle1'>
            Third Party Payment Processors. We use the services of third parties to process your payments 
            and we require that these third parties take the appropriate organizational and technical measures to protect your personal data and traffic data and to comply with relevant laws.
            Please review the terms of use and privacy policies of those third parties before providing your banking or payment information.
            </Typography>

            <Typography variant='subtitle1'>
            Payment Through Third Party Services. When you make a purchase within the Application, or the HNFRM Site through third parties, 
            your purchase is also subject to the terms of such third party (including with respect to payment terms, refunds, etc.), and 
            you should read such applicable terms before you decide to complete the purchase. 
            You agree to abide by any relevant terms of service or other legal agreement that governs your use of a given payment processing service and/or method. 
            You also acknowledge that a bank or credit card company may refuse or cancel a transaction and freeze funds up to 14 business days as per the bank/credit card company policy. 
            You also agree to the sharing of information between us and such third-party payment processor for billing related activity.
            </Typography>

            <Typography variant='subtitle1'>
            Credit Card Payments. We accept credit cards only with 3D Secure for payments within the HNFRM Site to make your transactions more secure. 
               Payments within the HNFRM Site from credit cards without 3D Secure will be rejected, and transactions will not be completed.
            </Typography>
            <Typography variant='subtitle1'>
            Fees and Taxes. You are solely responsible for all carrier data plans, Internet fees, and other fees and taxes associated with your access to and use of HNFRM Services.
            </Typography>
            <Typography variant='subtitle1'>
            Using the Service on mobile applications will use some of the data allowance available on the data package to which you have subscribed with your mobile network operator as the case may be. 
            Out-of-country usage may in any event lead to significantly higher costs than regular usage, and you are solely responsible for keeping yourself informed and paying for possible roaming 
            and other applicable charges levied by your mobile network operator.
            </Typography>
            <Typography variant='subtitle1'>
            HNFRRM may refuse or cancel a transaction at any time in our sole discretion, 
            if we believe it violates HNFRM Terms of Service or this Payment & Refund Policy or to prevent financial loss. 
            In cases of fraud or illegal acts, HNFRM may cancel or block your Credit Balance.
            </Typography>
          </Grid>
          <Grid Item>
            <Typography variant='h4' sx={{ml:-150}}>
            2.Refund Policy
            </Typography>
            <Typography variant='subtitle1' >
            Except as provided by law, all purchases are final and non-refundable. Taxes are non-refundable. 
            If you believe that HNFRM has charged you in error, you must contact HNFRM within 30 days of such charge. 
            No refunds will be given for any transaction which is more than 30 days old. When you purchase any digital content or services from HNFRM, 
            any right you may have to withdraw from or cancel the purchase will be terminated once the digital content is delivered to you upon your request, 
            and you will not be entitled to claim any refund, except where you believe HNFRM has charged you in error. 
            If you use third party services to purchase any of our Services, such purchase is subject to the refund terms of the applicable third party (including with respect to payment terms, refunds, etc.).
            </Typography>
            <Typography variant='subtitle1'>
            HNFRM reserves the right to refuse a refund request if it reasonably believes or suspects (i) that you are trying to unfairly exploit this refund policy, 
for example, by making repetitive refund requests in respect of the same product or feature, or by trying to receive a refund for a non-refundable credit (such as a reward); 
(ii) that you are in breach of the terms of  Policy, HNFRM Terms of Service, the MessageWhiz General Terms & Conditions or the Privacy Policy; 
(iii) that you are using any of our products fraudulently or that your user account is being used by a third party fraudulently; 
or (iv) that you purchased your credit through a third party service and the terms of such third party do not allow such refund. 
This refund policy does not affect any of your statutory rights to pursue a claim.
            </Typography>
            <Typography variant='subtitle1'>
            For all refunds due to an error in your payment amount please email disputes@HNRM.com quoting , 
Username, contact number, and reason for requesting a refund. The accounts department will deal with your query at the earliest possible opportunity and 
may ask for some additional details to process your refund.
            </Typography>
            <Typography variant='subtitle1'>
            Billing Disputes. Any billing disputes raised by you to MMDSmart will be settled in accordance with the HNFRM Terms of Service. 
A pending billing dispute does not exempt you from timely paying any undisputed amounts that you owe.
            </Typography>
          </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
          <Grid>
            <FormControlLabel
            
             label = "I agree to all terms and i want to precced"
              control = {
                <Checkbox
                 onChange={accept}
                />
            }
            />
              
          </Grid>

          </Box>
        </Grid>
      </ThemeProvider>
    );
}
export default Policy;