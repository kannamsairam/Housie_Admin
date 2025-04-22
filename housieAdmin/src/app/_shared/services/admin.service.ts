import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConfig } from '../../_shared//config/app.config';
import { Cache } from './cache';





@Injectable({
    providedIn: "root",
})
export class ApilistBanner {

    constructor(private http: HttpClient) { }
    getDataDetails(data: any): Promise<any> {
        return this.http.get('http://3.6.207.236:3002/user/getAllUserDetails', data).
            toPromise();
    }
}


@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor(private http: HttpClient,
        private cache: Cache) {
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            // Let the app keep running by returning an empty result.
            return of(error.error);
        };
    }

    logIn(data: any) {
        console.log('in login', this.cache.user);
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.login, data).then((resp: any) => {
                resolve(resp);
                this.cache.user.loggedIn = true;
                this.cache.user.authorization = resp.token;
                this.cache.set('user', this.cache.user);
                console.log(this.cache.user, 'user');
            }, (error) => {
                reject(error);
            });
        });
    }

    resetPassword(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.resetPassword, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    forgotPassword(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.forgotPassword, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    changePassword(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.changePassword, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    editProfile(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.editProfile, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getCounts() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getCounts, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getUsers(data:any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getUsers, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    tdsDetails(data:any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.tdsDetails, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
    DepositGstDetails(data:any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.DepositGstDetails, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
    deleteUser(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteUser, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                console.log(error, 'pop');

                reject(error);
            });
        });
    }

    updateUser(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateUser, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                console.log(error, 'pop');

                reject(error);
            });
        });
    }

    getUesrDetails(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getUesrDetails, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getProfileById(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getProfileById, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateKYC(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateKYC, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateUserWallet(data:any){
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateUserWallet, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getBanners() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getBanners, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    addBanner(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.addBanner, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    addForm16(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.uploadForm16, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getForm16ForUser(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getForm16ForUser, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateBanner(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateBanner, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteBanner(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteBanner, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getuserTransactions() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getuserTransactions, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    addNotification(data:any){
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.addNotification, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getNotification() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getNotification, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteNotification(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteNotification, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateNotification(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateNotification, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
    getBonus() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getBonus, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    addBonus(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.addBonus, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateBonus(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateBonus, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteBonus(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteBonus, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getSet() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getSet, null).then((resp: any) => {
                console.log(resp)
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    addSet(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.addSet, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteSet(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteSet, { quiz_id: data }).then((resp: any) => {
                console.log("==>", resp)
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getQuestions(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getQuestions, { set_id: data }).then((resp: any) => {
                console.log(resp, "<<===")
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteQuestion(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteQuestion, data).then((resp: any) => {
                console.log(resp, "<<===")
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateQuiz(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateQuiz, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getWithdrawRequests(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getWithdrawRequests, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    withdrawRequestsFilter(data:any){
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.withdrawRequestsFilter, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    transactionsFilter(data:any){
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.transactionsFilter, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
    updateWithdrawRequests(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateWithdrawRequests, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getAdmin() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.getAdmin, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    addAdmin(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.addAdmin, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateAdmin(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateAdmin, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteAdmin(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteAdmin, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    logOut() {
        return new Promise((resolve, reject) => {
            this.get(AppConfig.endpoints.logout, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    // addGame(data:any) {
    //     // return new Promise((resolve, reject) => {
    //     //     this.http.post(AppConfig.endpoints.addGame, JSON.stringify(data)).subscribe(data=>{
    //     //         console.log(data)
    //     //     })
    //     // });
    //     return new Promise((resolve, reject) => {
    //         this.save(AppConfig.endpoints.addGame, data).then((resp: any) => {
    //             console.log("resp==>",resp)
    //             resolve(resp);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

    // getGame() {
    //     return new Promise((resolve, reject) => {
    //         this.get(AppConfig.endpoints.getGame, null).then((resp: any) => {
    //             resolve(resp);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

    // uploadApp(data: any) {
    //     return new Promise((resolve, reject) => {
    //         this.save(AppConfig.endpoints.uploadApp, data).then((resp: any) => {
    //             resolve(resp);
    //         }, (error) => {
    //             reject(AppConfig.messages.http_error);
    //         });
    //     });
    // }

    save(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.postApi(url, data, null).then((resp: any) => {
                if (resp) {
                    if (resp.error == false || resp.error == 'false') {
                        resolve(resp);
                    } else {
                        reject(resp.title ? resp.title : resp.message ?  resp.message :   AppConfig.messages.http_error);
                    }
                } else {
                    reject(AppConfig.messages.http_error);
                }
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    get(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.getApi(url, data, null).then((resp: any) => {
                if (resp) {
                    if (resp.error == false || resp.error == 'false') {
                        resolve(resp);
                    } else {
                        reject(resp.message ? resp.message : AppConfig.messages.http_error);
                    }
                } else {
                    reject(AppConfig.messages.http_error);
                }
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }


    getApi(url: string, params: any, headers: any) {
        console.log("asdfghjk", AppConfig.host + url)

        if (!headers || !headers['Content-Type']) {
            headers = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
        }

        return new Promise((resolve, reject) => {
            this.http.get(AppConfig.host + url, { params: params, headers: headers })
                .pipe(map(resp => resp as {}), catchError(this.handleError([])))
                .subscribe(resp => {
                    resolve(resp);
                }, (error) => {
                    reject(error);
                });
        });
    }

    postApi(url: string, data: any, headers: any) {
        if (!headers || !headers.get('Content-Type')) {
            headers = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
        }

        return new Promise((resolve, reject) => {
            this.http.post(AppConfig.host + url, JSON.stringify(data), { headers: headers })
                .pipe(map(resp => resp as {}), catchError(this.handleError([])))
                .subscribe(resp => {
                    resolve(resp);
                }, (error) => {
                    reject(error);
                });
        });
    }


    addGame(data: any) {
        // return new Promise((resolve, reject) => {
        //     this.http.post(AppConfig.endpoints.addGame, JSON.stringify(data)).subscribe(data=>{
        //         console.log(data)
        //     })
        // });
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.addGame, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    updateGame(data: any) {
        // return new Promise((resolve, reject) => {
        //     this.http.post(AppConfig.endpoints.addGame, JSON.stringify(data)).subscribe(data=>{
        //         console.log(data)
        //     })
        // });
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.updateGame, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    deleteGame(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.deleteGame, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    cancelGame(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.cancelGame, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getGame() {
        return new Promise((resolve, reject) => {
            this.getApi(AppConfig.endpoints.getGame, null, null).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getGameById(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getGameById, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getGameByStatus(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getGameByStatus, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }


    getusersByGameId(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getUsersParticipated, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getusersTicketsByGameId(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getUserTicketsByGameId, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getNumberDetailsByGameId(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getNumberDetailsByUserId, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getUsersByNumberCrossed(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getUsersByNumberCrossed, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getOverAllNumbers(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getOverAllNumbers, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    getUsersByWinning(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getUsersByWinning, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }
    
    getallUsersByWinning(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.getallUsersByWinning, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    downloadImage(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.downloadImage, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }

    sendPushNotification(data: any) {
        return new Promise((resolve, reject) => {
            this.save(AppConfig.endpoints.pushNotification, data).then((resp: any) => {
                if (resp.error == false) {
                    console.log("Send........")
                }
                resolve(resp);
            }, (error) => {
                reject(AppConfig.messages.http_error);
            });
        });
    }
}





// http://localhost:3002/admin/getGameById
// {
//     "game_id":"11496"
// }
