import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../_shared//config/app.config';
import { Observable } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor() { }

    async uploadFile(file: any) {
        const contentType = file.type;
        
        const params: any = {
            Bucket: 'dreamhousi',
            Key: 'folder/' + Date.now() + '_' + file.name,
            Body: file,
            // ACL: 'public-read',
            ContentType: contentType
        };

        try {
            await bucket.putObject(params).promise();
            let data = await bucket.getSignedUrl('putObject', params);
            console.log({ data }, 'uday');

            return {
                url: `https://${params.Bucket}.s3.ap-south-1.amazonaws.com/${params.Key || ''}`,
            };
        } catch (error: any) {
            console.error(error.message);
            return { isError: true, message: error.message };
        }

        bucket.upload(params, function (err: any, data: any) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }

            console.log('Successfully uploaded file.', data);
            return true;
        });
        //for upload progress   
        /*bucket.upload(params).on('httpUploadProgress', function (evt) {
            console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
          if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
        });*/
    }

    toGetSignatureUrl() {

    }


    downloadImage(url: any) {
        let urlArray = url.split("/")
        let bucketName = 'dreamhousi'
        let key = `${urlArray[3]}/${urlArray[4]}`
        console.log({ bucketName, key });

        const bucket: any = new S3({
            accessKeyId: '',
            secretAccessKey: '',
            region: 'ap-south-1'
        });

        let params = { Bucket: bucketName, Key: key }
        bucket.getObject(params, (err: any, data: any) => {
            let blob = new Blob([data.Body], { type: data.ContentType });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = url;
            link.click();
        })
    }

    // async downloadAwsFile( fileUrl:any) {
    //     let s3 = new AWS.S3();
    //     const [BucketName, KeyName, FileName] = await extractS3Url(fileUrl);
    //     s3.getObject(
    //       {
    //         Bucket: BucketName,
    //         Key: KeyName,
    //       },
    //       (error:any, res:any) => {
    //         if (error) {
    //           console.log('Error occured while downloading files', error);
    //         } else {
    //           const ContentType = res.ContentType;
    //           const newBlob = new Blob([res.Body], { type: ContentType });
    //           if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //             window.navigator.msSaveOrOpenBlob(newBlob);
    //             return;
    //           }
    //           const data = window.URL.createObjectURL(newBlob);
    //           var link = document.createElement('a');
    //           link.href = data;
    //           link.download = FileName;
    //           link.click();
    //         }
    //       }
    //     );
    //   };

    // s3.getSignedUrl(
    //     "getObject",
    //     getParamsWithExpiry(params),
    //     (error, signedUrl) => {
    //         if (error) {
    //             console.log(error);
    //             reject("");
    //         } else {
    //             console.log("signedUrl,", signedUrl);
    //             resolve(signedUrl);
    //         }
    //     },
    // ); // getSignedUrl

    toCheckTicketReturn = (ticket: any) => {
        let finalObj: any = {
            jaldiWinner: {},
            cornerWinner: {},
            firstRowWinner: {},
            secondRowWinner: {},
            thirdRowWinner: {},
            fullHousiWinner: {},
            eventData: []
        };

        let numbersCrossed = ticket?.crossedNumbers?.[0]?.numbersCrossed || ticket.numbersCrossed;
        let tickets = ticket.tickets;
        ticket.prizes.map((item: any) => {
            if (item.firstRowWinner) {
                finalObj.firstRowWinner.data = numbersCrossed.filter((ele: any) =>
                    tickets[0].includes(ele)
                );
                let value = finalObj.firstRowWinner.data[finalObj.firstRowWinner.data.length - 1];
                finalObj.eventData.push(value)
                finalObj.firstRowWinner.value = value

                finalObj.firstRowWinner.prize = item.prize;
                finalObj.firstRowWinner.createdAt = item.createdAt;
            } else if (item.secondRowWinner) {
                finalObj.secondRowWinner.data = numbersCrossed.filter((ele: any) =>
                    tickets[1].includes(ele)
                );
                let value = finalObj.secondRowWinner.data[finalObj.secondRowWinner.data.length - 1];
                finalObj.eventData.push(value)
                finalObj.secondRowWinner.value = value

                finalObj.secondRowWinner.prize = item.prize;
                finalObj.secondRowWinner.createdAt = item.createdAt;
            } else if (item.thirdRowWinner) {
                finalObj.thirdRowWinner.data = numbersCrossed.filter((ele: any) =>
                    tickets[2].includes(ele)
                );
                let value = finalObj.thirdRowWinner.data[finalObj.thirdRowWinner.data.length - 1]
                finalObj.eventData.push(value)
                finalObj.thirdRowWinner.value = value
                finalObj.thirdRowWinner.prize = item.prize;
                finalObj.thirdRowWinner.createdAt = item.createdAt;
            } else if (item.jaldiWinner) {
                finalObj.jaldiWinner.data = numbersCrossed.slice(0, 5);
                let value = finalObj.jaldiWinner.data[finalObj.jaldiWinner.data.length - 1];
                finalObj.eventData.push(value)
                finalObj.jaldiWinner.value = value;

                finalObj.jaldiWinner.prize = item.prize;
                finalObj.jaldiWinner.createdAt = item.createdAt;
            } else if (item.cornerWinner) {
                let filterData = this.toReturnCornersData(tickets);
                finalObj.cornerWinner.data = numbersCrossed.filter((ele: any) =>
                    filterData.includes(ele)
                );
                let value = finalObj.cornerWinner.data[3];
                finalObj.eventData.push(value)
                finalObj.cornerWinner.value = value;
                finalObj.cornerWinner.prize = item.prize;
                finalObj.cornerWinner.createdAt = item.createdAt;
            } else if (item.fullHousiWinner) {
                finalObj.fullHousiWinner.data = numbersCrossed;
                let value = finalObj.fullHousiWinner.data[finalObj.fullHousiWinner.data.length - 1];
                finalObj.eventData.push(value)
                finalObj.fullHousiWinner.value = value;
                finalObj.fullHousiWinner.prize = item.prize;
                finalObj.fullHousiWinner.createdAt = item.createdAt;
                
            }
        });
        return { ...ticket, finalObj };
    };

    toReturnCornersData = (data: any) => {
        let firstRow = data[0].filter((el: any) => !!el);
        let lastRow = data[2].filter((el: any) => !!el);
        return [firstRow[0], firstRow[firstRow.length - 1], lastRow[0], lastRow[lastRow.length - 1]];
    };
}