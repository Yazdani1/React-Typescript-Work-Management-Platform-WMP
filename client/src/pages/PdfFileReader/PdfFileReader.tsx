import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';

import PageLayout from '../../Pagelayout/PageLayout';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfFileReader = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const pdf = await pdfjs.getDocument({
          data: reader.result as ArrayBuffer,
        }).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();

        const text = textContent.items
          .map((item) => {
            if ('str' in item) {
              return item.str;
            } else {
              return '';
            }
          })
          .join('');

        const regexName = /Name:\s*(.*)/;
        const regexEmail = /Email:\s*(.*)/;
        const regexDob = /Date of Birth:\s*(.*)/;
        const regexCountry = /Country:\s*(.*)/;
        const regexPhoneNumber = /Phone Number:\s*(.*)/;

        const nameMatch = text.match(regexName);
        const emailMatch = text.match(regexEmail);
        const dobMatch = text.match(regexDob);
        const countryMatch = text.match(regexCountry);
        const phoneNumberMatch = text.match(regexPhoneNumber);

        if (nameMatch && nameMatch[1]) {
          setName(nameMatch[1]);
        }
        if (emailMatch && emailMatch[1]) {
          setEmail(emailMatch[1]);
        }
        if (dobMatch && dobMatch[1]) {
          setDob(dobMatch[1]);
        }
        if (countryMatch && countryMatch[1]) {
          setCountry(countryMatch[1]);
        }
        if (phoneNumberMatch && phoneNumberMatch[1]) {
          setPhoneNumber(phoneNumberMatch[1]);
        }
      };
    }
  };

  //   const handleFileUpload = async (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.readAsArrayBuffer(file);
  //       reader.onloadend = async () => {
  //         //   const pdf = await pdfjs.getDocument({ data: reader.result }).promise;
  //         const pdf = await pdfjs.getDocument({
  //           data: reader.result as ArrayBuffer,
  //         }).promise;
  //         const page = await pdf.getPage(1);
  //         const textContent = await page.getTextContent();

  //         //   const text = textContent.items.map((item) => item.str).join('');
  //         const text = textContent.items
  //           .map((item) => {
  //             if ("str" in item) {
  //               return item.str;
  //             } else {
  //               return "";
  //             }
  //           })
  //           .join("");

  //         const regexName = /Name:\s*(.*)/;
  //         const regexEmail = /Email:\s*(.*)/;
  //         const regexDob = /Date of Birth:\s*(.*)/;
  //         const regexCountry = /Country:\s*(.*)/;
  //         const regexPhoneNumber = /Phone Number:\s*(.*)/;
  //         setName(text.match(regexName)?.[1] || "");
  //         setEmail(text.match(regexEmail)?.[1] || "");
  //         setDob(text.match(regexDob)?.[1] || "");
  //         setCountry(text.match(regexCountry)?.[1] || "");
  //         setPhoneNumber(text.match(regexPhoneNumber)?.[1] || "");
  //       };
  //     }
  //   };

  return (
    <form>
      <div>
        {name}
        <label htmlFor="file">Upload PDF file:</label>
        <input type="file" id="file" onChange={handleFileUpload} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <label htmlFor="dob">Date of birth:</label>
        <input type="text" id="dob" value={dob} onChange={(event) => setDob(event.target.value)} />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" value={country} onChange={(event) => setCountry(event.target.value)} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone number:</label>
        <input type="text" id="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PdfFileReader;
