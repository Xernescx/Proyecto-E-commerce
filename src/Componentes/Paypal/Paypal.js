import React from "react";
import ReactDOM from "react-dom";
import { db } from '../FireBase/Firebase'
import firebase from 'firebase/app';


const PaypalClass = ({ order }) => {

    const paypalConf = {
        currency: 'EUR',
        env: 'sandbox',
        cliente: {
            sandbox: 'AXANqxXyUpN9qBMRb5wZEXFmBDXYMr3vkA4XlkTn7-noKsMlb5f6ljUupgvTiFbqwy9vFJY9y3vkgVer',
            production: '-- id--',

        },
        style: {
            size: 'responsive',
            color: 'black',
            shape: 'pill',
            label: 'checkout',
        }
    };

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const payment = (data, actions) => {
        const payment = {
            transaction: [
                {
                    amount: {
                        total: order.total,
                        currency: paypalConf.currency,
                    },
                    description: "Compra de mi tienda",
                    custom: order.customer || '',
                    item_list: {
                        items: order.items
                    }
                }
            ],
            note_to_payer: 'Contactanos  para cualquier aclaracion'
        }
        return actions.payment.create({ payment })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then(response => {
                /*   console.log(response) */
                comprar()
                alert(`El pago fue exitoso ${response.id}`)
            })
            .catch(error => {
                console.log(error);
                alert("Ocurrio un error al procesar el pago")
            })
    };


    const onError = (error) => {
        console.log(error);
        alert("El pago no fue realizado, intentelo de nuevo ")
    }

    const onCancel = (data, actions) => {
        alert("Pago no realizado, pago cancelado por el usuario")
    }

    const comprar = () => {

        db.collection("pedidos").add({
            user: db.collection("users").doc(firebase.auth().currentUser.uid),
            date: new Date(),
            total: parseFloat(order.total),
            games: order.items


        }).then(() => {
            console.log("Document successfully updated!");

        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });


        db.collection("users").doc(firebase.auth().currentUser.uid).update({
            carrito: [],


        }).then(() => {
            console.log("Document successfully updated!");
            window.location = "/pedidos"
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }





    return (
        <PayPalButton
            env={paypalConf.env}
            client={paypalConf.cliente}
            payment={(data, actions) => payment(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="es_ES"
        />)

};

export default PaypalClass;