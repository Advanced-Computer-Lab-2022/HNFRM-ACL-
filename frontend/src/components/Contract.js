import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PageNotFound from './PageNotFound'
const { useState , useEffect} = require("react");



const theme = createTheme();


const Check = () => {
  const [status, setStatus] = useState(false);


  const accept = async () => {

    try{
      axios.patch(`http://localhost:8000/contract`,{accept:"true"},{
      headers: {
          "token" :  localStorage.getItem("token")
      }})
    .then((res) =>{
      console.log(res.data)
      setStatus(true)
    }
    )
  }
  catch(error){
    window.location.href=`/notfound`
  }


    }
    
    

  useEffect(()=>{
    if(status){
      window.location.href=`/policy`
    }
    
    });

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" >
            <Box>
          <Grid Item>
            <br></br>
            <Typography variant='h2' sx= {{ml:-135 , mt:3}}>
            Contact Terms
            </Typography>
          </Grid>
          <br></br>
          <br></br>
          
          <Grid Item>
            <Typography variant='h4' sx={{ml:-155}}>
            1. Definitions.
            </Typography>
            <br></br>
            <Typography variant='subtitle1' sx={{ml:3}}>
            1.1 Unless the context otherwise requires, the following terms, when used in this Agreement, 
            shall have the respective meanings specified below (such meanings to be equally applicable to the singular 
           and the plural forms of the terms defined).
            </Typography>

            <Typography variant='subtitle1' sx={{ml:3}}>
            - Affiliate” of a Person shall mean any other Person that (directly or indirectly) is controlled by, 
            controls or is under common control with such Person. For the purposes of this definition, 
            the term “control” (including, with correlative meanings, the terms “controlled by” 
            and “under common control with”) as used with respect to a Person, will mean the possession, 
            directly or indirectly, of the power to direct, or cause the direction of, the management or policies of such Person, 
            whether through the ownership of voting securities, by contract or otherwise, and “control” will be presumed to exist 
            if either of the following conditions is met: (a) in the case of a corporate entity, 
            direct or indirect ownership of voting securities entitled to cast at least 50% of the votes in the election of directors; 
            or (b) in the case of a non-corporate entity, direct or indirect ownership of at least 50% of the equity interests with the power to direct the management and policies of such entity. Notwithstanding the foregoing, neither Party will be deemed an Affiliate of the other Party.
            </Typography>
            
            <Typography variant='subtitle1' sx={{ml:3}}>
            - “Aggregated Application(s)” shall mean Application(s) that aggregates syndicated content in one location for easy viewing developed or provided by Publisher or a third party, in each case on which the Video will be published hereunder, as specified in the applicable Order Form.
            “Application(s)” shall mean any and all software applications, whether 
            (i) developed by Publisher on behalf of Client; (ii) independently developed by Publisher; and/or 
            (iii) developed or provided by a third party, in each case on which the Video will be published hereunder, 
            as specified in the applicable Order Form.
            </Typography>

            
            <Typography variant='subtitle1' sx={{ml:1}}>
            - “Demand Partner” shall mean a third party who brings advertiser demand to ad inventory (supply) in 
            connection with Publisher’s publication of the Client’s Video on through the Platform(s) under this Agreement and from whom Publisher receives Net Revenues in connection therewith.

            </Typography>

            <Typography variant='subtitle1' sx={{ml:-86}}>
            - “CTV” shall mean any “connected television” used to or capable of streaming video over the Internet.
            </Typography>

            <Typography variant='subtitle1' sx={{ml:4}}>
            - Defects” shall mean deficiencies in content or technical defects in regard to the graphics, 
            animation, or other Video assets and attributes developed and/or provided by Client, 
            and may be recognized or arise prior, during or after public release of the Video. Defects may include,
            by way of example only and not limitation, cases where (a) the Video is rendered partially or completely non-functional, 
            (b) the Video produces incorrect or misleading information, (c) there is a detriment to the visual representation, 
            sound or Video play of the Video, (d) the Video erroneously interrupts information given to it, 
            (e) there are errors in any textual information, including serious grammatical errors, or 
            (f) the Video or elements thereof infringe, violate or misappropriate any third party’s Intellectual Property Rights 
            or other proprietary rights.
            </Typography>

            <Typography variant='subtitle1' sx={{ml:1}}>
            - “Demand Partner” shall mean a third party who brings advertiser demand to ad inventory (supply) in connection with Publisher’s publication of the Client’s Video on through the Platform(s) under this Agreement and from whom Publisher receives Net Revenues in connection therewith.
            “Intellectual Property Rights” shall mean any and all (by whatever name or term known or designated) tangible and 
            intangible and now known or hereafter existing (a) rights associated with works of authorship throughout the universe, 
            including but not limited to copyrights (including without limitation the sole and exclusive right 
            to prepare derivative works of the copyrighted work and to copy, manufacture, reproduce, distribute copies of, modify, 
            publicly perform and publicly display the copyrighted work and all derivative works thereof) and moral rights, 
            (b) trademarks, service marks, trade names, goodwill, rights in packaging, rights of publicity, merchandising rights, 
            advertising rights and other commercial rights, and all rights associated therewith, (c) trade secret rights, (d) patents, 
            designs, algorithms and other industrial property rights, (e) all other intellectual 
            and industrial property and proprietary rights (of every kind and nature throughout the universe and however designated) 
            whether or not analogous to any of the foregoing rights (including without limitation Internet domain names, logos, 
            character rights, “rental” rights and rights to remuneration), whether arising by operation of law, contract, license 
            or otherwise, and (f) all registrations, applications, renewals, extensions, continuations, divisions or reissues 
            thereof now or hereafter in force throughout the universe (including without limitation rights in any of the foregoing.
            </Typography>
           <Typography variant='subtitle1' sx={{ml:4}}>
            - “Net Revenues” shall mean gross receipts from the sources actually received by Publisher and arising from Publisher’s 
            distribution and publishing of the Video through the Platform(s), less the following:
            </Typography>
            <Typography variant='subtitle1' sx={{ml:5}}>
            A- taxes, returns, allowances, reversals, charge-backs, chargeback fees and fines, credits and refunds;
            B - royalties or license fees paid to platform manufacturers and licensors (if applicable);
            C- third-party representation and agency fees (including without limitation advertising agency fees, fees payable by Publisher for third party advertising serving);
            D- marketing costs and consumer acquisition fees incurred with respect to the promotion of the Video, if agreed according to Section 7.4; and
                any other reasonable costs, if agreed according to Section 7.4.
            </Typography>


            <Typography variant='subtitle1' sx={{ml:5}}>
            “Order Form” shall mean an order form to this Agreement which is mutually executed by the Parties for publishing of the Video, 
            setting forth the Application(s), Platform(s) and Royalty rate and other terms applicable to the publishing of each such Video. 
            An Order Form may be related to one or more Video(s).
            </Typography>

            <Typography variant='subtitle1' sx={{ml:5}}>

            “Person” shall mean any individual, partnership, limited liability company, firm, corporation, association, trust, 
            unincorporated organization or other entity.
            </Typography>

            <Typography variant='subtitle1' sx={{ml:5}}>
            “Platform(s)” shall mean the third party CTV/OTT platform on which the Application(s) will be developed and/or published, 
            as specified in the Order Form. The list of Platform(s) specified in the Order Form shall mean 
            the possibility of variants that will be chosen at the sole discretion of Publisher. Please note, that the Publisher may, 
            but is not obligated to publish Application(s) on all of the specified Platform(s).
            </Typography>

            <Typography variant='subtitle1'>
            “Publisher Affiliates” shall mean Publisher’s Affiliates.
            </Typography>
          </Grid>
          <br></br>
          <Grid Item>
            <Typography variant='h4' sx={{ml:-115}}>
            2. Grant of License. Development.
            </Typography>
            <br></br>
            <Typography variant='subtitle1' sx={{ml:3}}>
            2.1 Grant of License. Client hereby grants to Publisher the right and license specified in the applicable Order Form, 
            with the right of sublicense to Publisher Affiliates or Sublicensee (If the right of Sublicense is granted under the applicable Order Form) 
            to: copy, modify, create derivative works of, publicly display, localize, host, maintain, support, sell, publish, operate, service, use, promote, 
            advertise, distribute and market (“Exploit”) the Video on the Application(s) through the Platform(s) during Term of this Agreement within the Territory. 
            The foregoing right and license expressly includes the right to sublicense the foregoing rights to the Platform(s) to the extent necessary for Publisher 
            or any Publisher Affiliate to fully exercise the foregoing rights.
            </Typography>
            <Typography variant='subtitle1' sx={{ml:2}}>
            2.1.1. Right to Grant Sublicense. If the right of Sublicense is granted under the applicable Order Form, Publisher shall have the right to grant Sublicense to Sublicensee without the prior written consent or other approval solely within the Territory. Publisher shall cause each Sublicensee to comply with the applicable terms and conditions of this Agreement. Publisher shall remain responsible for the performance of Sublicensee that is granted Sublicense as permitted herein, and the grant of any such Sublicense shall not relieve Publisher of its obligations under this Agreement. With respect to any such Sublicense, Publisher shall ensure that the agreement pursuant to which it grants such Sublicense (i) does not conflict with the terms and conditions of this Agreement; (ii) terms relating to intellectual property and data ownership consistent with those set forth in this Agreement, and (ii) contains terms obligating the Sublicensee to comply with confidentiality provisions consistent with those set forth in this Agreement. The granting of Sublicense shall be at Publisher’s sole discretion and Publisher shall have the sole power 
            to determine the identity of any Sublicensee, the applicable fees or royalty rates, if any, and other terms and conditions 
            of any Sublicense. Each Sublicense granted to a Sublicensee by Publisher to any rights licensed to it hereunder shall terminate 
            immediately upon the termination of the license from Client to Publisher with respect to such rights as of the effective date of such termination
            </Typography>
            <Typography variant='subtitle1' sx={{ml:2}}>
            2.2 Video Development. No later than five (5) business days after signing the Order Form, Client shall design, develop, integrate content, 
            produce, pre-test, complete and deliver the Video to Publisher in accordance with all applicable Specifications. Unless otherwise 
            set forth in the applicable Order Form, the Video shall be delivered in one of the following formats: mp4 files in HD or Full HD resolution. 
            The Video shall be delivered electronically to Publisher in accordance with Publisher’s instructions, unles otherwise agreed by the Parties.
            </Typography>
            <Typography variant='subtitle1' sx={{ml:2.5}}>
            2.3 Application(s) Development. Publisher may start the development of the Application(s) upon receipt of all Videos from Client as set forth in this Agreement. If the Video is inappropriate at the sole discretion of Publisher, the Publisher may at its sole discretion not develop the Application(s) or not use the Video or any rights granted herein without any liability to Client. Publisher shall not be responsible for (i) the time-period during which such Application(s) will be accepted by the Platform; (ii) delays in the provision of the Video(s) to Publisher in accordance with this Agreement; (iii) delays introduced by Defects in the Video(s); or (iv) any other delays or errors not attributable to Publisher’s failure to perform Publisher’s obligations under this Agreement.

            </Typography>
          </Grid>
          <br></br>
          <Grid Item>
            <Typography variant='h4' sx={{ml:-110}}>
            3. Permissions. Third Party Materials.
            </Typography>
            <br></br>
            <Typography variant='subtitle1' sx={{ml:2}}>
            If any Video contains any non-original material provided by Client (or its contractors), prior to or upon delivery of such Video, Client shall identify such material and the owner or copyright holder thereof. Client shall, at its own expense and in form acceptable to Publisher, obtain written authorization from the owner or copyright holder of such material for Publisher to use the material, free of cost to Publisher, in perpetuity and without restriction throughout the universe, including therein all rights to Exploit such material. Such written authorization shall be delivered to Publisher promptly following its receipt by Client but in no event later than the delivery of the Video containing such material. The foregoing shall not apply to material owned or copyrighted by Publisher. Client represents and warrants to Publisher that to the extent any Video content was created by employees, agents or contractors of Client (“Client Personnel”), each such Client Personnel has assigned to Client their entire right, title and interest in and to such content (including all Intellectual Property Rights therein) and, 
            to the extent permissible under applicable laws, waived any moral rights such Client Personnel may have in such content.
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

const Contract = () =>{
  const [type, setType] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:8000/isLogin' ,{
        headers: {
            "token" :  localStorage.getItem("token")
        },
    }).then(
    (res) => { 
        const user = res.data;
        setType(user.type)
        //setPolicy(user.policy)
        })
    });

    let Add;
    if(type=='Instructor'){
      Add =<Check></Check>
    }
    else{
      Add =<PageNotFound></PageNotFound>
    }

    return(
      <Box>
        {Add}
      </Box>
    )

}


export default Contract;