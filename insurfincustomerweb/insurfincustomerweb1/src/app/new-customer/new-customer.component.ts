import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PleaseConfirmComponent } from '../please-confirm/please-confirm.component';
import { CustomerServiceService } from '../services/customer-service.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { AccessLocationComponent } from '../location-popups/access-location/access-location.component';
import { LocationSuccessComponent } from '../location-popups/location-success/location-success.component';
import { DetectedWrongaddressComponent } from '../location-popups/detected-wrongaddress/detected-wrongaddress.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CaptchaPopupComponent } from './captcha-popup/captcha-popup.component';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {

  Gender: any = [
    "Male",
    "Female",
    "Others"
  ]
  stateName: any = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli",
    "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]
  employee: any = [
    "Self Employed Professional",
    "Self Employed Business",
    "Self Employed Type 3",
    "Self Employed Type 4"
  ]
  communicationAddress!: FormGroup
  permanentAddress!: FormGroup
  customerInfoForm!: FormGroup
  salaryEmploymentForm!: FormGroup
  selfEmploymentForm!: FormGroup
  salaryForm!: FormGroup
  selfForm!: FormGroup
  kycForm!: FormGroup
  currentAddress!: FormGroup
  countryDisabled: boolean = true;
  selectedIndex: number = 0;
  salary: boolean = true
  imgname: any;
  imgback: any;
  imgbpan: any;
  updatedbankFile1: any;
  imgbank1: any;
  updatedbankFile2: any;
  imgbank2: any;
  Panupdatefile: any;
  updatefilefrnt: any;
  updatefileback: any;
  imgdocument1: any;
  imgdocument2: any;
  imgdocument3: any;
  documents2: any;
  documents3: any;
  documents1: any;
  aadharFront = false
  aadharBack = false
  panCard = false
  cancelCheque = false
  bankStatement = false
  incorporation = false
  incomeTax = false
  gstCertificate = false
  customerData: any = [];
  getUserId: string = '';
  isSalaried = true
  isSalary = true;
  isSelf = true;
  showCurrentAddress = false;

  currentAddressValue: any;
  isCurrentAddressMatched: boolean | null = null;
  onlyvalidateLocation: any;
  restrictCutomerEdit: boolean = true;
  userId: any;
  documentIds: any = []
  aadhaarFrontUploaded: any;
  aadharbackUploaded: any;
  pancardUploaded: any;
  bankCheque: any;
  bankStatementMessage: any;
  gstCertificateMessage: any;
  incomeTaxMessage: any;
  incorporateMessage: any;
  showDataa: boolean = false;
  AadharError: any;
  captchaBase64: string = '';
  tokenValid: any;
  aadharVerified: boolean = false;
  disabledState: boolean = true
  permanent: boolean = false
  panelOpenState = false;
  openPanel1 = true
  openPanel2 = true
  gstNumber: any;
  panVerificationError: any;
  panVerification: any;
  isReadOnly: boolean = true;
  // disabledGender: boolean=true
  selectDisabled: boolean = false;
  disableGender: boolean | undefined;
  disableState: boolean | undefined;
  customerUuid: any;
  panNameError: any;
  customerPersonalInfo: any;
  customerAddressDetails: any;
  customerEmployeeData: any;
  employeetype: any;
  aadharNotmasked: any;
  errorMsg: any;
  latitude: any;
  langitude: any;
  panNotmasked: any;
  routeData: any;
  data: any;
  panDetails: any;
  customerinfoDt: any;
  AadharNameError: any;
  AadharmisMatch: any;
  addressEmptyField: any;
  isCheckboxChecked: boolean = false
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private customerService: CustomerServiceService, private loginService: LoginServicesService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const userData = navigation.extras.state['userData'];
      this.data = userData;

    }
  }

  ngOnInit(): void {
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.customerInfoForm = this.formBuilder.group({
      fullname: ["", [Validators.required, Validators.pattern("^\\S.[a-zA-Z_ ]*$")]],
      dob: ["", Validators.required],
      gender: [, Validators.required],
      phnnum: [{ value: "", disabled: true }, [Validators.required, Validators.pattern("^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$")]],
      aadhaarnum: [, [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]],
      pancardnum: [, [Validators.required, Validators.pattern("^([A-Z]){5}([0-9]){4}([A-Z]){1}$")]]
    });
    this.currentAddress = this.formBuilder.group({
      currentaddressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      currentaddressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      currentcity: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      currentstate: [, Validators.required],
      currentcountry: [{ value: "India", disabled: true }, Validators.required],
      currentpincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],


    }, { validators: checkSameCurrentAddress });
    function checkSameCurrentAddress(formGroup: FormGroup) {
      const currentaddressline1 = formGroup.get('currentaddressline1')?.value;
      const currentaddressline2 = formGroup.get('currentaddressline2')?.value;

      if (currentaddressline1 && currentaddressline2 && currentaddressline1 === currentaddressline2) {
        formGroup.get('currentaddressline2')?.setErrors({ sameAddress: true });
      }
    };
    this.communicationAddress = this.formBuilder.group({
      addressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      addressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      city: ["", [Validators.required, Validators.pattern("^(?!\\.)\\s*\\S.*$")]],
      state: [null, Validators.required],
      country: [{ value: "India", disabled: this.countryDisabled }, Validators.required],
      pincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
      // gstNumber: ["", [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9]{1}$")]],

    }, { validators: checkSameCommunicationAddress });
    function checkSameCommunicationAddress(formGroup: FormGroup) {
      const addressline1 = formGroup.get('addressline1')?.value;
      const addressline2 = formGroup.get('addressline2')?.value;

      if (addressline1 && addressline2 && addressline1 === addressline2) {
        formGroup.get('addressline2')?.setErrors({ sameAddress: true });
      }
    };

    this.permanentAddress = this.formBuilder.group({
      paddressline1: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      paddressline2: ["", [Validators.required, Validators.pattern("^\\S.*$")]],
      pcity: ["", [Validators.required, Validators.pattern("^(?!\\.)\\s*\\S.*$")]],
      pstate: [null, Validators.required],
      pcountry: [{ value: "India", disabled: this.countryDisabled }, Validators.required],
      ppincode: ["", [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    }, { validators: checkSamePaddress });
    function checkSamePaddress(formGroup: FormGroup) {
      const paddressline1 = formGroup.get('paddressline1')?.value;
      const paddressline2 = formGroup.get('paddressline2')?.value;

      if (paddressline1 && paddressline2 && paddressline1 === paddressline2) {
        formGroup.get('paddressline2')?.setErrors({ sameAddress: true });
      }
    };
    this.salaryEmploymentForm = this.formBuilder.group({
      companyname: ["", Validators.required],
      pemail: [{ value: "", disabled: true }, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      semail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mincome: ["", [Validators.required, this.minIncomeValidator()]]
    }, { validators: checSalaryEmail });
    function checSalaryEmail(formGroup: FormGroup) {
      const salaryPrimaryEmail = formGroup.get('pemail')?.value;
      const salarySecondaryEmail = formGroup.get('semail')?.value;
      if (salaryPrimaryEmail && salarySecondaryEmail && salaryPrimaryEmail === salarySecondaryEmail) {
        formGroup.get('semail')?.setErrors({ isEmail: true });
      } else {
        // formGroup.get('semail')?.setErrors(null);
        formGroup.get('semail')?.value;
      }
    };
    this.selfEmploymentForm = this.formBuilder.group({
      temployement: [, Validators.required],
      primaryemail: [{ value: "", disabled: true }, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      secondaryemail: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      aincome: ["", [Validators.required, this.selfminIncomeValidator()]]
    }, { validators: checSelfEmail });
    function checSelfEmail(formGroup: FormGroup) {
      const selfPrimaryEmail = formGroup.get('primaryemail')?.value;
      const selfSecondaryEmail = formGroup.get('secondaryemail')?.value;
      if (selfPrimaryEmail === selfSecondaryEmail) {
        formGroup.get('secondaryemail')?.setErrors({ isSelfEmail: true });
      } else {
        //formGroup.get('semail')?.setErrors(null);
        formGroup.get('secondaryemail')?.value
      }
    };
    this.salaryForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      cancelchequeimg: ["", Validators.required],
      bankstatementimg: ["", [Validators.required]],
    });
    this.selfForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      gstcertificateimg: ["", Validators.required],
      incometaximg: ["", Validators.required],
      incorporationimg: ["", Validators.required]
    });
    // if (localStorage.getItem('userId')) {
    //   this.getUserId = JSON.parse(localStorage.getItem('userId') ?? '');
    //   this.editCustomerDetails();
    // }
    // this.route.queryParams.subscribe(params => {
    //   this.onlyvalidateLocation = params['validateLocation'];
    //   // this.onlyvalidateLocation = true;
    //   // console.log("###", params, this.onlyvalidateLocation);
    //   if (this.onlyvalidateLocation == 'true') {
    //     this.restrictCutomerEdit = true;
    //     this.selectedIndex = 1;
    //   }
    // });
    this.route.queryParams.subscribe(params => {
      this.restrictCutomerEdit = params['restrictCutomerEdit'] === 'true' 
    });
    // this.customerInfoForm.controls['aadhaarnum']?.disable();
    if (sessionStorage.getItem('panDetails') !== null) {
      this.panDetails = JSON.parse(sessionStorage.getItem('panDetails') ?? '')
    }
    if (this.panDetails) {
      this.customerInfoForm.patchValue({
        pancardnum: this.panDetails?.pan,
      })
      this.panVerification = this.panDetails?.panVerify
      this.customerInfoForm.controls['pancardnum']?.disable();
      this.customerInfoForm.controls['aadhaarnum']?.enable();
    }
    this.editCustomerDetails();
    if (this.data != null) {
      this.AadharNameError = this.data

    }
  }


  minIncomeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || typeof value !== 'string') {
        return null; // Return null if value is not a string
      }
      const income = parseFloat(value.replace(/,/g, ''));
      if (isNaN(income) || income < 20000) {
        return { minIncome: true };
      }
      return null;
    };
  }
  selfminIncomeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || typeof value !== 'string') {
        return null; // Return null if value is not a string
      }
      const income = parseFloat(value.replace(/,/g, ''));
      if (isNaN(income) || income < 300000) {
        return { minIncome: true };
      }
      return null;
    };
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
  target: any;
  toCamelCase(event: any) {
    const input = event.target.value;
    //console.log(input);
    this.target = this.convertToCamelCase(input);
    //console.log(this.target);
  }


  convertToCamelCase(input: string): string {
    return input
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  customerInfo() {
    this.selectedIndex = 1
    // this.selectDisabled = true;
    this.disableGender = true;
    this.disableState = true;
    const data = {
      customerInfoDetails: {
        aadharNumber: this.customerInfoForm.controls['aadhaarnum'].value.replace(/[^0-9\.]/g, ''),
        dateOfBirth: this.customerInfoForm.controls['dob'].value,
        fullName: this.customerInfoForm.controls['fullname'].value,
        gender: this.customerInfoForm.controls['gender'].value,
        panNumber: this.customerInfoForm.controls['pancardnum'].value,
        phoneNumber: this.customerInfoForm.controls['phnnum'].value,
      }
    }
    sessionStorage.setItem('customerInfo', JSON.stringify(data))
    this.customerPersonalInfo = data.customerInfoDetails
  }

  communicationAddressContinue() {
    this.disableState = true;
    // if (this.permanentAddress.valid) {
    if (this.currentAddressValue) {
      // console.log(this.permanentAddress.value);
      const data = {
        customerAddressDetails: [
          {
            addressLine1: this.communicationAddress.controls['addressline1'].value,
            addressLine2: this.communicationAddress.controls['addressline2'].value,
            addressType: "communication",
            city: this.communicationAddress.controls['city'].value,
            country: this.communicationAddress.controls['country'].value,
            pinCode: this.communicationAddress.controls['pincode'].value,
            state: this.communicationAddress.controls['state'].value
          },
          {
            addressLine1: this.permanentAddress.controls['paddressline1'].value,
            addressLine2: this.permanentAddress.controls['paddressline2'].value,
            addressType: "permanent",
            city: this.permanentAddress.controls['pcity'].value,
            country: this.permanentAddress.controls['pcountry'].value,
            pinCode: this.permanentAddress.controls['ppincode'].value,
            state: this.permanentAddress.controls['pstate'].value
          },
          {
            addressLine1: this.currentAddressValue.addressLine1,
            addressLine2: this.currentAddressValue.addressLine2,
            addressType: "current",
            city: this.currentAddressValue.city,
            country: this.currentAddressValue.country,
            pinCode: this.currentAddressValue.pinCode,
            state: this.currentAddressValue.state,
            formatted_address: this.currentAddressValue.formatted_address,
            location: this.currentAddressValue.location,
          },
        ],
        currentAddressMatched: this.isCurrentAddressMatched
      }
      this.customerAddressDetails = data.customerAddressDetails
      sessionStorage.setItem('addressDetails', JSON.stringify(this.customerAddressDetails));
      // console.log(this.customerAddressDetails, 'addre');
      // Condition need to remove after api not failing
      if (this.restrictCutomerEdit === true) {
        this.selectedIndex += 2;
        if (this.customerData?.employmentDetails?.employmentType === 'SALARIEDEMPLOYEE') {
          const data = {
            employementDetails: {
              employmentType: "SALARIEDEMPLOYEE",
              salariedEmployeeDetails: {
                customerEmployeeData: this.salaryEmploymentForm.controls['companyname'].value,
                monthlyIncome: ("" + this.salaryEmploymentForm.controls['mincome'].value).replace(/[^0-9\.]/g, ''),
                primaryEmail: this.salaryEmploymentForm.controls['pemail'].value,
                secondaryEmail: this.salaryEmploymentForm.controls['semail'].value,
              }
            }
          }
          this.customerEmployeeData = data
        }
        else{
          const data = {
            employementDetails: {
              employmentType: "SELFEMPLOYEE",
              selfEmployeeDetails: {
                annualIncome: ('' + this.selfEmploymentForm.controls['aincome'].value).replace(/[^0-9\.]/g, ''),
                primaryEmail: this.selfEmploymentForm.controls['primaryemail'].value,
                secondaryEmail: this.selfEmploymentForm.controls['secondaryemail'].value,
                typeOfEmployement: this.selfEmploymentForm.controls['temployement'].value
              }
            }
          }
          this.customerEmployeeData = data
        }
      } else {
        // this.router.navigate(['./registration-successfull']);
        this.selectedIndex += 1;
      }

    }
    else {
      this.yourLocation();
    }

    // }
  }

  yourLocation() {
    let dialogRef = this.dialog.open(AccessLocationComponent, {
      width: '270px',
    })

    dialogRef.afterClosed().subscribe((res) => {
      // console.log(this.communicationAddress.value);
      // console.log(res);
      let userEnteredAddress = this.communicationAddress.value;
      if (res) {
        let firstAddress = res.results[0 || 1 || 2];
        let tempAddress = []
        let addressObj: any = {
          address: []
        };
        firstAddress.address_components.forEach(x => {
          if (x.types.indexOf('country') !== -1) {
            addressObj['country'] = x.long_name;
          }
          if (x.types.indexOf('postal_code') !== -1) {
            addressObj['pincode'] = x.long_name;
          }
          if (x.types.indexOf('administrative_area_level_1') !== -1) {
            addressObj['state'] = x.long_name;
          }
          if (x.types.indexOf('administrative_area_level_3') !== -1) {
            addressObj['town'] = x.long_name;
          }
          if (x.types.indexOf('locality') !== -1) {
            addressObj['city'] = x.long_name;
          }
          if (x.types.indexOf('sublocality') !== -1 || x.types.indexOf('neighborhood') !== -1 || x.types.indexOf('route') !== -1 || x.types.indexOf('street_number') !== -1) {
            addressObj['address'].push(x.long_name);
          }
        })
        // geometry
        // firstAddress.geometry.forEach(x =>{
        //   if (x.types.indexOf('location') !== -1) {
        //     addressObj['latitude'] = x.lat;
        //   }
        //   if (x.types.indexOf('location') !== -1) {
        //     addressObj['langitude'] = x.lng;
        //   }
        // })
        addressObj['formatted_Address'] = firstAddress.formatted_address;
        addressObj['location'] = firstAddress.geometry.location;
        this.latitude = firstAddress.geometry.location.lat,
          this.langitude = firstAddress.geometry.location.lng
        // console.log(addressObj);
        let isUserAdressMatched = false;
        // if(addressObj.address.indexOf(userEnteredAddress.addressline1) !== -1) 
        //   isUserAdressMatched = true;
        addressObj.address.forEach((address: string) => {
          if (address.toLowerCase() === userEnteredAddress.addressline1.toLowerCase() ||
            address.toLowerCase() === userEnteredAddress.addressline2.toLowerCase()) {
            isUserAdressMatched = true;
          }
        })
        // if(addressObj.address.indexOf(userEnteredAddress.addressline2) !== -1) 
        // isUserAdressMatched = true;
        if (isUserAdressMatched) {
          // Need to call api or need to add one flag for stating that user address is matched with geo address
          // alert("Address matched");
          this.appendCurrentAddresss(addressObj, true);
          const dialogRef = this.dialog.open(LocationSuccessComponent);
          dialogRef.afterClosed().subscribe(() => {
            //  this.selectedIndex = 1;
            this.communicationAddressContinue();
          });
          // this.permanentAddressContinue();

        } else {
          let dialogRef2 = this.dialog.open(DetectedWrongaddressComponent);
          //this.communicationAddressContinue();
          dialogRef2.afterClosed().subscribe((res) => {
            if (res) {
              if (res == 'detectGeoAddress') {
                this.yourLocation();
              } else if (res == 'continueGeoAddress') {
                // Show geo address in the new tab as per figma with the addressObj data with disable fields
                // console.log(addressObj);
                this.showCurrentAddress = true;
                this.appendCurrentAddresss(addressObj, false);
              }
            }
          });
        }
      }
    });
  }

  appendCurrentAddresss(value, isAddressMatched) {
    this.currentAddressValue = {
      addressLine1: value.address[0],
      addressLine2: value.address.slice(1).join(','),
      city: value.city,
      state: value.state,
      country: value.country,
      pinCode: value.pincode,
      formatted_address: value.formatted_address,
      location: value.location.lat + ',' + value.location.lng,
    }
    this.isCurrentAddressMatched = isAddressMatched;
    if (!isAddressMatched) {
      this.currentAddress.patchValue({
        currentaddressline1: this.currentAddressValue.addressLine1,
        currentaddressline2: this.currentAddressValue.addressLine2,
        currentcity: this.currentAddressValue.city,
        currentstate: this.currentAddressValue.state,
        currentcountry: this.currentAddressValue.country,
        currentpincode: this.currentAddressValue.pinCode,
      })
    }
  }
  isAddressLineEmpty(): boolean {
    const addressLine1Empty = this.permanentAddress.controls['paddressline1'].value === '';
    const addressLine2Empty = this.permanentAddress.controls['paddressline2'].value === '';

    // Set the addressEmptyField message if either address line is empty
    if (addressLine1Empty || addressLine2Empty) {
      this.addressEmptyField = 'Permanent address line 1 is empty. So please fill the communication details manually';
    } else {
      this.addressEmptyField = ''; // Reset the message if both address lines are not empty
    }

    return addressLine1Empty || addressLine2Empty;
  }
  checkValue(e: any) {
    this.isCheckboxChecked = true
    if (e.target.checked) {
      const address1Val = this.permanentAddress.controls["paddressline1"].value;
      const address2Val = this.permanentAddress.controls["paddressline2"].value;
      const cityVal = this.permanentAddress.controls["pcity"].value.replace(/ /g, '');
      const stateVal = this.permanentAddress.controls["pstate"].value;
      // const countryVal = this.currentAddress.controls["pcountry"].value;
      const pincodeVal = this.permanentAddress.controls["ppincode"].value;

      this.communicationAddress.controls["addressline1"].setValue(address1Val);
      this.communicationAddress.controls["addressline2"].setValue(address2Val);
      this.communicationAddress.controls["city"].setValue(cityVal);
      this.communicationAddress.controls["state"].setValue(stateVal);
      // this.communicationAddress.controls["country"].setValue(countryVal);
      this.communicationAddress.controls["pincode"].setValue(pincodeVal);
    }
    else {
      this.communicationAddress.controls["addressline1"]?.setValue('');
      this.communicationAddress.controls["addressline2"]?.setValue('');
      this.communicationAddress.controls["city"]?.setValue('');
      this.communicationAddress.controls["state"]?.setValue('');
      // this.communicationAddress.controls["pcountry"].setValue('');
      this.communicationAddress.controls["pincode"]?.setValue('');
    }
  }

  checkSalary() {
    this.salary = true
  }

  checkSelf() {
    this.salary = false
  }

  salariedEmployment() {
    const data = {
      employementDetails: {
        employmentType: "SALARIEDEMPLOYEE",
        salariedEmployeeDetails: {
          customerEmployeeData: this.salaryEmploymentForm.controls['companyname'].value,
          monthlyIncome: ("" + this.salaryEmploymentForm.controls['mincome'].value).replace(/[^0-9\.]/g, ''),
          primaryEmail: this.salaryEmploymentForm.controls['pemail'].value,
          secondaryEmail: this.salaryEmploymentForm.controls['semail'].value,
        }
      }
    }
    sessionStorage.setItem('employeeDetails', JSON.stringify(data));
    this.customerEmployeeData = data
    if (this.salaryEmploymentForm.valid) {
      this.selectedIndex += 1;
    }
  }
  selfEmployment() {
    const data = {
      employementDetails: {
        employmentType: "SELFEMPLOYEE",
        selfEmployeeDetails: {
          annualIncome: ('' + this.selfEmploymentForm.controls['aincome'].value).replace(/[^0-9\.]/g, ''),
          primaryEmail: this.selfEmploymentForm.controls['primaryemail'].value,
          secondaryEmail: this.selfEmploymentForm.controls['secondaryemail'].value,
          typeOfEmployement: this.selfEmploymentForm.controls['temployement'].value
        }
      }
    }
    sessionStorage.setItem('employeeDetails', JSON.stringify(data));
    this.customerEmployeeData = data
    if (this.selfEmploymentForm.valid) {
      this.selectedIndex += 1;
    }
  }
  updatedIds: any = []
  AdharFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefilefrnt = event.target.files[0];
    if (this.updatefilefrnt.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatefilefrnt);
      this.imgname = event.target.files[0].name;
      // console.log('gh', this.imgname)
      const formData = new FormData();
      formData.append('file', this.updatefilefrnt)
      this.customerService.Document(this.getUserId, 'AADHAR_FRONT_IMG', formData).subscribe((res: any) => {
        res.Adharimgback;
        // this.documentIds.push(res.documentId);
        this.aadhaarFrontUploaded = res.message;
        this.updatedIds.push({ documentId: res.documentId, documentType: 'AADHAR_FRONT_IMG' })
        // console.log(this.aadhaarFrontUploaded, 'DocumentUpload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  //adhar back file//

  AdharBackFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefileback = event.target.files[0];
    if (this.updatefileback.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatefileback);
      this.imgback = event.target.files[0].name;
      // console.log('gh', this.imgback)
      const formData = new FormData();
      formData.append('file', this.updatefileback)
      this.customerService.Document(this.getUserId, 'AADHAR_BACK_IMG', formData).subscribe((res: any) => {
        res.Adharimgback;
        // this.documentIds.push(res.documentId);
        this.aadharbackUploaded = res.message;
        this.updatedIds.push({ documentId: res.documentId, documentType: 'AADHAR_BACK_IMG' })
        // console.log(this.aadharbackUploaded, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  //pan upload//
  PanFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.Panupdatefile = event.target.files[0];
    if (this.Panupdatefile.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.Panupdatefile);
      this.imgbpan = event.target.files[0].name;
      // console.log('gh', this.imgbpan)
      const formData = new FormData();
      formData.append('file', this.Panupdatefile)
      this.customerService.Document(this.getUserId, 'PAN_CARD', formData).subscribe((res: any) => {
        res.Adharimgback;
        // this.documentIds.push(res.documentId);
        this.pancardUploaded = res.message;
        this.updatedIds.push({ documentId: res.documentId, documentType: 'PAN_CARD' })
        // console.log(this.pancardUploaded, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  BankdetailsCheque(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile1 = event.target.files[0];
    if (this.updatedbankFile1.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatedbankFile1);
      this.imgbank1 = event.target.files[0].name;
      // console.log('gh', this.imgbank1)
      const formData = new FormData();
      formData.append('file', this.updatedbankFile1)
      this.customerService.Document(this.getUserId, 'BANK_CHEQUE', formData).subscribe((res: any) => {
        res.Adharimgback;
        // this.documentIds.push(res.documentId);
        this.bankCheque = res.message;
        this.updatedIds.push({ documentId: res.documentId, documentType: 'BANK_CHEQUE' })
        // console.log(this.bankCheque, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  BankdetailStatement(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile2 = event.target.files[0];
    if (this.updatedbankFile2.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatedbankFile2);
      this.imgbank2 = event.target.files[0].name;
      // console.log('gh', this.imgbank2)
      const formData = new FormData();
      formData.append('file', this.updatedbankFile2)
      this.customerService.Document(this.getUserId, 'BANK_STATEMENT', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.bankStatementMessage = res.message;
        // this.updatedIds.push({ documentId: res.documentId, documentType: 'BANK_STATEMENT' })
        // console.log(this.bankStatementMessage, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadGstCertificate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents1 = event.target.files[0];
    if (this.documents1.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.documents1);
      this.imgdocument1 = event.target.files[0].name;
      // console.log('gh', this.imgdocument1)
      const formData = new FormData();
      formData.append('file', this.documents1)
      this.customerService.Document(this.getUserId, 'GST', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.gstCertificateMessage = res.message;
        // this.updatedIds.push({ documentId: res.documentId, documentType: 'GST' })
        // console.log(this.gstCertificateMessage, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }


  uploadIncomeTax(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents2 = event.target.files[0];
    if (this.documents2.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.imgdocument2);
      this.imgdocument2 = event.target.files[0].name;
      // console.log('gh', this.imgdocument2)
      const formData = new FormData();
      formData.append('file', this.documents2)
      this.customerService.Document(this.getUserId, 'ITR', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.incomeTaxMessage = res.message;
        // this.updatedIds.push({ documentId: res.documentId, documentType: 'ITR' })
        // console.log(this.gstCertificateMessage, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }

  uploadIncorporate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents3 = event.target.files[0];
    if (this.documents3.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.imgdocument3);
      this.imgdocument3 = event.target.files[0].name;
      // console.log('gh', this.imgdocument3)
      const formData = new FormData();
      formData.append('file', this.documents3)
      this.customerService.Document(this.getUserId, 'INCORPORATION_CERT', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
        this.incorporateMessage = res.message;
        // this.updatedIds.push({ documentId: res.documentId, documentType: 'INCORPORATION_CERT' })
        // console.log(this.gstCertificateMessage, 'DocumentUPload');
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
    event.target.value = null;
  }
  onAadhaarFront() {
    this.aadharFront = true
  }
  onAadhaarBack() {
    this.aadharBack = true
  }
  onPanCard() {
    this.panCard = true
  }
  onCancelCheque() {
    this.cancelCheque = true
  }
  onBankStatement() {
    this.bankStatement = true
  }
  onGst() {
    this.gstCertificate = true
  }
  onIncome() {
    this.incomeTax = true
  }
  onIncorporation() {
    this.incorporation = true
  }
  // removeAadharFront(event: Event) {
  //   this.imgname = ""
  //   event.preventDefault();

  // }
  // removeAadharBack(event: Event) {
  //   this.imgback = ""
  //   event.preventDefault();
  // }
  // removePan(event: Event) {
  //   this.imgbpan = ""
  //   event.preventDefault();
  // }
  removeCancelCheque(event: Event) {
    this.imgbank1 = ""
    event.preventDefault();
  }
  removeBankStatement(event: Event) {
    this.imgbank2 = ""
    event.preventDefault();
  }
  removeGst(event: Event) {
    this.imgdocument1 = ""
    event.preventDefault();
  }
  removeIncome(event: Event) {
    this.imgdocument2 = ""
    event.preventDefault();
  }
  removeIncorporation(event: Event) {
    this.imgdocument3 = ""
    event.preventDefault();
  }
  // salaryContinue() {
  //   if (this.showDataa == false) {
  //     const data = {
  //       customerKycDetails: {
  //         documentIds:
  //           this.documentIds
  //       }
  //     }
  //     this.customerService.UpdateCustomer(this.getUserId, data).subscribe((res) => {
  //       if (!res.error) {
  //         this.router.navigate(['./registration-successfull'])
  //       }
  //       // else {
  //       //   // alert(res.data.result);


  //       // }
  //     });
  //   }
  //   else {
  //     this.salaryData()
  //   }
  // }
  saveCustomerContinue() {
    //   if(this.showDataa == false){
    //   const data = {
    //     customerKycDetails: {
    //       documentIds:
    //         this.documentIds
    //     }
    //   }
    //   this.customerService.UpdateCustomer(this.getUserId, data).subscribe((res) => {
    //     if (!res.error) {
    //       this.router.navigate(['./registration-successfull'])
    //     } else {
    //       alert(res.data.result);
    //     }
    //   });
    // }
    // else{
    //   this.selfData()
    // }
    if (this.customerEmployeeData.employementDetails.employmentType === 'SELFEMPLOYEE') {
            this.employeetype = {
        // "employmentDto": {
        "employmentType": "SELFEMPLOYEE",
        "selfEmployeeDetails": {
          "typeOfEmployement": this.customerEmployeeData?.employementDetails.selfEmployeeDetails.typeOfEmployement,
          "primaryEmail": this.customerEmployeeData?.employementDetails.selfEmployeeDetails.primaryEmail,
          "secondaryEmail": this.customerEmployeeData?.employementDetails.selfEmployeeDetails.secondaryEmail,
          "annualIncome": this.customerEmployeeData?.employementDetails.selfEmployeeDetails.annualIncome,
        },
        "salariedEmployeeDetails": null,
        // }
      }
    }
    else {
      this.employeetype = {
        "employmentType": "SALARIEDEMPLOYEE",
        "salariedEmployeeDetails": {
          "companyName": this.customerEmployeeData?.employementDetails.salariedEmployeeDetails.customerEmployeeData,
          "primaryEmail": this.customerEmployeeData?.employementDetails.salariedEmployeeDetails.primaryEmail,
          "secondaryEmail": this.customerEmployeeData?.employementDetails.salariedEmployeeDetails.secondaryEmail,
          "monthlyIncome": this.customerEmployeeData?.employementDetails.salariedEmployeeDetails.monthlyIncome,
        },
        "selfEmployeeDetails": null,
      }
    }
    const data = {
      "fullName": this.customerPersonalInfo?.fullName,
      "dateOfBirth": this.customerPersonalInfo?.dateOfBirth,
      "gender": this.customerPersonalInfo?.gender,
      "phoneNumber": this.customerPersonalInfo?.phoneNumber,
      "aadhaarNumber": this.aadharNotmasked,
      "panNumber": this.customerPersonalInfo?.panNumber,
      "maritalStatus": "SINGLE",
      "employmentDto": this.employeetype,
      "addresses": [
        {
          "addressType": "CURRENT",
          "addressLine1": this.customerAddressDetails[2]?.addressLine1,
          "addressLine2": this.customerAddressDetails[2]?.addressLine2,
          "country": this.customerAddressDetails[2]?.country,
          "state": this.customerAddressDetails[2]?.state,
          "city": this.customerAddressDetails[2]?.city,
          "pinCode": this.customerAddressDetails[2]?.pinCode,
          "location": null,
          "formatted_Address": null
        },
        {
          "addressType": "COMMUNICATION",
          "addressLine1": this.customerAddressDetails[0]?.addressLine1,
          "addressLine2": this.customerAddressDetails[0]?.addressLine2,
          "country": this.customerAddressDetails[0]?.country,
          "state": this.customerAddressDetails[0]?.state,
          "city": this.customerAddressDetails[0]?.city,
          "pinCode": this.customerAddressDetails[0]?.pinCode,
          "location": null,
          "formatted_Address": null
        },
        {
          "addressType": "PERMANENT",
          "addressLine1": this.customerAddressDetails[0]?.addressLine1,
          "addressLine2": this.customerAddressDetails[0]?.addressLine2,
          "country": this.customerAddressDetails[0]?.country,
          "state": this.customerAddressDetails[0]?.state,
          "city": this.customerAddressDetails[0]?.city,
          "pinCode": this.customerAddressDetails[0]?.pinCode,
          "location": null,
          "formatted_Address": null
        }
      ],
      "documentsDto": {
        documentIds:
          this.documentIds
      },
      "latitude": this.langitude,
      "longitude": this.latitude,
      "currentAddressMatched": true
    }
    this.customerService.customerSave(this.getUserId, data).subscribe({
      next: (res: any) => {
        if (res?.error == false) {
          this.router.navigate(['./registration-successfull'])
        }
        else {
          this.errorMsg = res?.message
        }
      },
      error: (err) => {
        this.errorMsg = "No Active Internet Found, Please connect to active internet Connection."
      }
    })
  }
  // salaryData() {
  //   let existingarr = [];
  //   if (this.customerData && this.customerData.documentList) {
  //     existingarr = this.customerData.documentList.map((x: any) => ({
  //       documentId: x.documentId,
  //       documentType: x.documentType
  //     }));
  //   }
  //   console.log(existingarr);
  //   let newArray: any = [...this.updatedIds, ...existingarr];

  //   console.log(newArray, 'newarr');
  //   const latestDocuments = {};
  //   newArray.forEach(document => {
  //     const { documentId, documentType } = document;
  //     if (latestDocuments.hasOwnProperty(documentType)) {
  //       if (documentId > latestDocuments[documentType].documentId) {
  //         latestDocuments[documentType] = document;
  //       }
  //     } else {
  //       latestDocuments[documentType] = document;
  //     }
  //   });

  //   const latestDocumentsArray = Object.values(latestDocuments);
  //   let ids = latestDocumentsArray.map((x: any) => x.documentId);

  //   // if (latestDocumentsArray.length === 0) {
  //   const data = {
  //     customerKycDetails: {
  //       documentIds: ids
  //     }
  //   }
  //   this.customerService.UpdateCustomer(this.getUserId, data).subscribe((res) => {
  //     this.router.navigate(['./registration-successfull'])
  //   });
  //   // } else {
  //   //  // alert('Please fill all the Documents OR Skip for Now')
  //   // }
  // }
  // selfData() {
  //   let existingarr: any = [];
  //   if (this.customerData && this.customerData.documentList) {
  //     existingarr = this.customerData.documentList?.filter((item) => item.documentType !== "BANK_CHEQUE" && item.documentType !== "BANK_STATEMENT").
  //       map((x: any) => ({
  //         documentId: x.documentId,
  //         documentType: x.documentType
  //       }));
  //   }
  //   let newArray: any = [...this.updatedIds, ...existingarr];

  //   const latestDocuments = {};
  //   newArray.forEach(document => {
  //     const { documentId, documentType } = document;

  //     if (latestDocuments.hasOwnProperty(documentType)) {
  //       if (documentId > latestDocuments[documentType].documentId) {
  //         latestDocuments[documentType] = document;
  //       }
  //     } else {
  //       latestDocuments[documentType] = document;
  //     }
  //   });
  //   const latestDocumentsArray = Object.values(latestDocuments);
  //   let ids = latestDocumentsArray.map((x: any) => x.documentId)

  //   // if (latestDocumentsArray.length === 6) {
  //   const data = {
  //     customerKycDetails: {
  //       documentIds: ids
  //     }
  //   }
  //   // console.log(data);
  //   this.customerService.UpdateCustomer(this.getUserId, data).subscribe((res) => {
  //     this.router.navigate(['./registration-successfull'])
  //   });
  //   // } else {
  //   //   alert('Please fill all the Documents Or Skip For Now')
  //   // }

  // }
  kycContinue() {
    this.dialog.open(PleaseConfirmComponent, {
      width: '329px'
    });

    if (this.kycForm.valid) {
      // console.log(this.kycForm.value)
    }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(DatePickerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        // console.log("Dialog output:", data);
        this.customerInfoForm.patchValue({
          dob: data
        })
      }
    );
  }
  checkdobValue(dobValue){
    dobValue = this.customerInfoForm.controls['dob'].value;
    const [day, month, year] = dobValue.split('/');
    const formattedDate = `${day}/${month}/${year}`;
  }
  editCustomerDetails() {
    this.customerUuid = JSON.parse(sessionStorage.getItem('UserId') ?? '');
    this.loginService.getCustomerdata(this.customerUuid).subscribe((res: any) => {
      this.showDataa = true;
      if (res) {
        this.customerData = res?.data;
        if ((sessionStorage.getItem('persnlDetails') != null)) {
          this.customerinfoDt = JSON.parse(sessionStorage.getItem('persnlDetails') ?? 'null')
          const [day, month, year] = this.customerinfoDt.result?.data.dateOfBirth.split('-');
      const formattedDate = `${day}/${month}/${year}`;
          this.customerInfoForm.patchValue({
            fullname: this.customerinfoDt.result?.data.name,
            dob: formattedDate,
            gender: this.customerinfoDt.result?.data.gender,
            aadharNumber: this.customerinfoDt.aadharNumber,
            phnnum: this.customerData.phoneNumber,
          });
          const maskedAadhar = 'X'.repeat(8) + this.customerinfoDt.aadharNumber.slice(8);
          this.customerInfoForm.controls['aadhaarnum'].setValue(maskedAadhar);
          this.aadharVerified = true;
          let addressLine1 = ''
          if (this.customerinfoDt?.result?.data.address.house && this.customerinfoDt?.result?.data.address.street) {
            addressLine1 = `${this.customerinfoDt?.result?.data.address.house}, ${this.customerinfoDt?.result?.data.address.street}`;
          } else if (this.customerinfoDt?.result?.data.address.house || this.customerinfoDt?.result?.data.address.street) {
            addressLine1 = `${this.customerinfoDt?.result?.data.address.house || this.customerinfoDt?.result?.data.address.street}`;
          }
          let addressLine2 = ''
          if (this.customerinfoDt?.result?.data.address.landmark && this.customerinfoDt?.result?.data.address.loc) {
            addressLine2 = `${this.customerinfoDt?.result?.data.address.landmark}, ${this.customerinfoDt?.result?.data.address.loc}`;
          } else if (this.customerinfoDt?.result?.data.address.landmark || this.customerinfoDt?.result?.data.address.loc) {
            addressLine2 = `${this.customerinfoDt?.result?.data.address.landmark || this.customerinfoDt?.result?.data.address.loc}`;
          }
          this.permanentAddress.patchValue({
            paddressline1: addressLine1,
            paddressline2: addressLine2,
            pcity: this.customerinfoDt?.result.data.address.dist,
            pstate: this.customerinfoDt?.result.data.address.state,
            pcountry: this.customerinfoDt?.result.data.address.country,
            ppincode: this.customerinfoDt?.result.data.address.pc,
          });
          if(this.customerInfoForm.controls['dob']?.value !==''){
            this.customerInfoForm.controls['dob']?.disable();
          }
          if(this.customerInfoForm.controls['gender']?.value !==''){
            this.customerInfoForm.controls['gender']?.disable();
          }
          if(this.customerInfoForm.controls['fullname']?.value !==''){
            this.customerInfoForm.controls['fullname']?.disable();
          }
          if(this.customerInfoForm.controls['aadhaarnum']?.value !==''){
            this.customerInfoForm.controls['aadhaarnum']?.disable();
          }
          if(this.permanentAddress.controls['paddressline1']?.value !==''){
            this.permanentAddress.controls['paddressline1']?.disable();
          }
          if(this.permanentAddress.controls['paddressline2']?.value !==''){
            this.permanentAddress.controls['paddressline2']?.disable();
          }
          if(this.permanentAddress.controls['pcity']?.value !==''){
            this.permanentAddress.controls['pcity']?.disable();
          }
          if(this.permanentAddress.controls['pstate']?.value !==''){
            this.permanentAddress.controls['pstate']?.disable();
          }
          if(this.permanentAddress.controls['ppincode']?.value !==''){
            this.permanentAddress.controls['ppincode']?.disable();
          }
        }
        else {
          this.customerInfoForm.patchValue({
            fullname: this.customerData?.fullName,
            dob: this.customerData?.dateOfBirth,
            gender: this.customerData?.gender,
            phnnum: this.customerData?.phoneNumber,
            // aadhaarnum: this.customerData.aadharNumber,
            // pancardnum: this.customerData.panNumber
          });
        }
        if (this.customerData?.employmentDetails?.employmentType === 'SALARIEDEMPLOYEE') {
          this.salaryEmploymentForm.patchValue({
            companyname: this.customerData?.employmentDetails?.salariedEmployeeDetails?.companyName,
            pemail: this.customerData?.employmentDetails?.salariedEmployeeDetails?.primaryEmail,
            semail: this.customerData?.employmentDetails?.salariedEmployeeDetails?.secondaryEmail,
            mincome: this.customerData?.employmentDetails?.salariedEmployeeDetails?.monthlyIncome,
          });
          this.salary = true
          this.isSalaried = true
          this.isSelf = false;
          // this.imgname = (this.customerData.documentList && this.customerData.documentList.find(doc => doc.documentType === 'AADHAR_FRONT_IMG').s3FileName) || null
          // this.imgback =  (this.customerData.documentList && this.customerData.documentList.find(doc => doc.documentType === 'AADHAR_BACK_IMG').s3FileName) || null
          // this.imgbpan =  (this.customerData.documentList && this.customerData.documentList.find(doc => doc.documentType === 'PAN_CARD').s3FileName) || null
          if (this.customerData.employmentDetails?.employmentType === 'SALARIEDEMPLOYEE') {
            this.imgbank1 = (this.customerData?.documentList && this.customerData.documentList.find((doc: any) => doc.documentType === 'BANK_CHEQUE').s3FileName.replace(/^\d+_/, '')) || null
            this.imgbank2 = (this.customerData?.documentList && this.customerData.documentList.find((doc: any) => doc.documentType === 'BANK_STATEMENT').s3FileName.replace(/^\d+_/, '')) || null
          }

        }

        if (this.customerData?.employmentDetails?.employmentType === 'SELFEMPLOYEE') {
          this.selfEmploymentForm.patchValue({
            temployement: this.customerData?.employmentDetails?.selfEmployeeDetails?.typeOfEmployement,
            primaryemail: this.customerData?.employmentDetails?.selfEmployeeDetails?.primaryEmail,
            secondaryemail: this.customerData?.employmentDetails?.selfEmployeeDetails?.secondaryEmail,
            aincome: this.customerData?.employmentDetails?.selfEmployeeDetails?.annualIncome,
          });
          this.salary = false
          this.isSalaried = false
          this.isSalary = false;
          if (this.customerData?.employmentDetails?.employmentType === 'SELFEMPLOYEE') {
            // this.imgname = (this.customerData.documentList && this.customerData.documentList.find(doc => doc.documentType === 'AADHAR_FRONT_IMG').s3FileName) || null
            // this.imgback =  (this.customerData.documentList && this.customerData.documentList.find(doc => doc.documentType === 'AADHAR_BACK_IMG').s3FileName) || null
            // this.imgbpan =  (this.customerData.documentList && this.customerData.documentList.find(doc => doc.documentType === 'PAN_CARD').s3FileName) || null
            this.imgdocument1 = (this.customerData?.documentList && this.customerData.documentList.find((doc: any) => doc.documentType === 'GST').s3FileName.replace(/^\d+_/, '')) || null
            this.imgdocument2 = (this.customerData?.documentList && this.customerData.documentList.find((doc: any) => doc.documentType === 'INCORPORATION_CERT').s3FileName.replace(/^\d+_/, '')) || null
            this.imgdocument3 = (this.customerData?.documentList && this.customerData.documentList.find((doc: any) => doc.documentType === 'ITR').s3FileName.replace(/^\d+_/, '')) || null
          }
        }
        // this.imgname = this.customerData.documentList.find(doc => doc.documentType === 'AADHAR_FRONT_IMG').s3FileName
        // this.imgback = this.customerData.documentList.find(doc => doc.documentType === 'AADHAR_BACK_IMG').s3FileName
        // this.imgbpan = this.customerData.documentList.find(doc => doc.documentType === 'PAN_CARD').s3FileName
        // this.imgbank1 = this.customerData.documentList.find(doc => doc.documentType === 'BANK_CHEQUE').s3FileName
        // this.imgbank2 = this.customerData.documentList.find(doc => doc.documentType === 'BANK_STATEMENT').s3FileName      
        // let uploaddocument :any[] = []
        //  this.customerData.documentList.map((res:any) =>{
        //   // return res.documentId
        //   uploaddocument.push(res.documentId);
        //   this.documentIds = uploaddocument
        // })
        // console.log(uploaddocument);
      }
    })
  }
  // docUpload(){
  //   let uploaddocument = this.customerData.documentList.filter((res:any) =>{
  //     return res.documentId
  //   })
  //   console.log(uploaddocument);
  // }
  skipKyc() {
    this.dialog.open(PleaseConfirmComponent)
  }
  navigatebackArrow() {
    this.router.navigate(['./customer-details']);
  }

  truncateFileName(fileName: string): string {
    const maxLength = 35;
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substr(0, maxLength) + '...';
    }
  }

  onVerify() {
    // if (this.customerInfoForm) {
    //   if (this.customerInfoForm.get('panVerification')?.value === true) {
    //     this.customerInfoForm.get('aadharVerified')?.enable();
    //   } else {
    //     this.customerInfoForm.get('aadharVerified')?.disable();
    //   }

    // }
    if (this.customerData.aadhaarNumber.substr(8)
      !== this.customerInfoForm.controls['aadhaarnum'].value.substr(8)) {
      this.AadharError = "Aadhaar mismatch. Last 4 digits of the entered Aadhaar don't match the one with distributor."
      return;
    };
    if (this.customerInfoForm.valid) {
      const data = {
        // aadharNumber : '494825854559'
        aadharNumber: this.customerInfoForm.controls['aadhaarnum'].value.replace(/[^0-9\.]/g, '')
      }
      this.customerService.aadharValid(data).subscribe((res: any) => {
        if (res.error == false) {
          this.captchaBase64 = res?.data.captcha,
            this.tokenValid = res?.data.token,
            this.routeData = {
              captcha: this.captchaBase64,
              token: this.tokenValid,
              fullname: this.customerInfoForm.controls['fullname'].value,
              dob: this.customerInfoForm.controls['dob'].value.replace(/\//g, '-'),
              gender: this.customerInfoForm.controls['gender'].value,
              aadharNumber: this.customerInfoForm.controls['aadhaarnum'].value
            }
          let aadharNumber = this.routeData.aadharNumber
          sessionStorage.setItem('aadharNumber', aadharNumber)
          if(this.restrictCutomerEdit === true){
            this.router.navigate(['/captcha'], {
              state:
              {
                userData: this.routeData,
              },
              queryParams: {
                restrictCutomerEdit: true,
              },
            });
          }
          else{
          this.router.navigate(['/captcha'], {
            state:
            {
              userData: this.routeData,
            }
          });
        }
        }
        else {
          this.AadharError = res.message
        }
      })
    }
  }
  restrictToNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
  }

  // currentAddressContinue() {
  //   if (this.currentAddress.valid) {
  //     const details = {
  //       addressline1: this.currentAddress.controls['addressline1'].value,
  //       addressline2: this.currentAddress.controls['addressline2'].value,
  //       city: this.currentAddress.controls['city'].value,
  //       state: this.currentAddress.controls['state'].value,
  //       pincode: this.currentAddress.controls['pincode'].value,
  //     }
  //     sessionStorage.setItem('checkAddress', JSON.stringify(details))
  //     this.currentAddress.controls['addressline1']?.disable();
  //     this.currentAddress.controls['addressline2']?.disable();
  //     this.currentAddress.controls['city']?.disable();
  //     this.currentAddress.controls['state']?.disable();
  //     this.disabledState = true
  //     this.currentAddress.controls['pincode']?.disable();
  //     this.selectedIndex += 1;
  //     this.openPanel1 = true
  //     this.permanent = true

  //   } else {
  //     for (const control of Object.keys(this.currentAddress.controls)) {
  //       this.currentAddress.controls[control].markAsTouched();
  //     }
  //     return;
  //   }

  // }
  addPermanent() {
    if (this.currentAddress.valid) {
      this.openPanel1 = true
      this.permanent = true
    }
    else {
      this.openPanel1 = true
      this.permanent = true
    }
  }

  // panValidation(value: any) {
  //   if (this.customerInfoForm.controls['pancardnum'].valid) {
  //     const data = {
  //       pan: this.customerInfoForm.controls['pancardnum'].value,
  //       fullName: this.customerInfoForm.controls['fullname'].value,
  //       userId: this.customerUuid
  //     }
  //     this.customerService.panValid(data).subscribe((res: any) => {
  //       if (res?.error === false) {
  //         this.panVerification = res?.message
  //         this.customerInfoForm.controls['fullname']?.disable();
  //         this.customerInfoForm.controls['pancardnum']?.disable();
  //         const panValue = this.customerInfoForm.controls['pancardnum']?.value; // Get the original PAN value
  //         const maskedPan = panValue.slice(0, 2) + 'X'.repeat(6) + panValue.slice(-2);
  //         this.customerInfoForm.controls['pancardnum'].setValue(maskedPan);
  //         this.customerInfoForm.controls['aadhaarnum']?.enable()
  //         const details: any = {
  //           fullname: this.customerInfoForm.controls['fullname'].value,
  //           pan: this.customerInfoForm.controls['pancardnum'].value,
  //           panVerify: res?.message
  //         }
  //         sessionStorage.setItem('panDetails', JSON.stringify(details))
  //       }
  //       else {
  //         this.panVerificationError = res?.message
  //       }
  //     })
  //   }
  // }
  panValidation(value: any) {
    const panNum = value.target.value.toUpperCase();
    this.customerInfoForm.patchValue({ pancardnum: panNum });
    if (this.customerData.panNumber.substr(6)
      !== this.customerInfoForm.controls['pancardnum'].value.substr(6)) {
      this.panVerificationError = "PAN mismatch. Last 4 digits of the entered pan don't match the one with distributor."
      return;
    };
    if (this.customerInfoForm.controls['pancardnum'].valid) {
      const data = {
        pan: this.customerInfoForm.controls['pancardnum'].value,
        fullName: this.customerInfoForm.controls['fullname'].value,
        userId: this.customerUuid
      }
      this.customerService.panValid(data).subscribe((res: any) => {
        if (res?.error === false) {
          this.panVerification = res?.message
          this.panNotmasked = data.pan
          this.customerInfoForm.controls['pancardnum']?.disable();
          const panValue = this.customerInfoForm.controls['pancardnum']?.value; // Get the original PAN value
          //const maskedPan = panValue.slice(0, 2) + 'X'.repeat(6) + panValue.slice(-2); // Get first two digits and last two digits
          const maskedPan = 'X'.repeat(6) + panValue.slice(-4); // get last four digits 

          this.customerInfoForm.controls['pancardnum'].setValue(maskedPan);
          this.customerInfoForm.controls['aadhaarnum']?.enable()
          const details: any = {
            // fullname: this.customerInfoForm.controls['fullname'].value,
            pan: this.customerInfoForm.controls['pancardnum'].value,
            panVerify: res?.message
          }
          sessionStorage.setItem('panDetails', JSON.stringify(details))
          if (res?.message === 'Name does not match Pan Details') {
            this.panNameError = res?.message
            this.panVerification = 'PAN number verified'
            this.customerInfoForm.controls['pancardnum']?.disable();
            this.customerInfoForm.controls['aadhaarnum']?.enable();
            const details: any = {
              pan: this.customerInfoForm.controls['pancardnum'].value,
              panVerify: this.panVerification
            }
            sessionStorage.setItem('panDetails', JSON.stringify(details))
          }
        }
        else {
          this.panVerificationError = res?.message
        }
      })

    }
    else {

    }
  }

  // getAaadharVerfied() {
  //   if ((sessionStorage.getItem('persnlDetails') !== null)) {

  //   }
  //   if (this.data != null) {
  //     const result = this.data.result;
  //     const maskedAadhar = 'X'.repeat(8) + this.data.aadharNumber.slice(8);
  //     this.customerInfoForm.controls['aadhaarnum'].setValue(maskedAadhar);
  //     if (result != null) {
  //       this.aadharVerified = true;
  //       this.permanentAddress.patchValue({
  //         paddressline1: result?.data.house,
  //         paddressline2: result?.data.street,
  //         pcity: result?.data.dist,
  //         pstate: result?.data.state,
  //         pcountry: result?.data.country,
  //         ppincode: result?.data.pc,
  //       })

  //       //   const AadharValue = this.registerForm.controls['aadhaarNumber'].value; // Get the original PAN value
  //       // const AadharValue = this.data.aadharNumber;
  //       // const maskedAadhar = 'X'.repeat(8) + AadharValue.slice(8);
  //       // this.customerInfoForm.controls['aadhaarnum'].setValue(maskedAadhar);
  //       // this.customerInfoForm.controls['dob'].setValue(this.data.dob);
  //       // this.customerInfoForm.controls['gender'].setValue(this.data.gender);
  //       // // for local store data  
  //       // const details: any = {
  //       //   fullname: this.customerInfoForm.controls['fullname'].value,
  //       //   dob: this.customerInfoForm.controls['dob'].value,
  //       //   gender: this.customerInfoForm.controls['gender'].value,
  //       //   // email: this.customerInfoForm.controls['email'].value,
  //       //   aadhaarNumber: this.customerInfoForm.controls['aadhaarnum'].value,
  //       //   paddressline1: this.permanentAddress.controls['paddressline1'].value,
  //       //   paddressline2: this.permanentAddress.controls['paddressline2'].value,
  //       //   pcity: this.permanentAddress.controls['pcity'].value,
  //       //   pstate: this.permanentAddress.controls['pstate'].value,
  //       //   pcountry: this.permanentAddress.controls['pcountry'].value,
  //       //   ppincode: this.permanentAddress.controls['ppincode'].value,
  //       // }
  //       // sessionStorage.setItem('persnlDetails', JSON.stringify(details))
  //       this.customerInfoForm.controls['dob']?.disable();
  //       this.customerInfoForm.controls['gender']?.disable();
  //       this.customerInfoForm.controls['fullname']?.disable();
  //       this.customerInfoForm.controls['aadhaarnum']?.disable();
  //       //this.customerInfoForm.controls['email']?.disable();
  //       this.permanentAddress.controls['paddressline1']?.disable();
  //       this.permanentAddress.controls['paddressline2']?.disable();
  //       this.permanentAddress.controls['pcity']?.disable();
  //       this.permanentAddress.controls['pstate']?.disable();
  //       this.permanentAddress.controls['ppincode']?.disable();
  //     }
  //     else {
  //       this.AadharError = result.message
  //     }
  //   }
  // }
}
