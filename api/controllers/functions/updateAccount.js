const account = async (sponsorAccount, newBalance, dateValue)=>{
    // update the sponsor account balance with the newly summed up balance
    let updatedSponsorAccount  = await sponsorAccount.update({
        balance: newBalance,
        date: dateValue,
    })

    return updatedSponsorAccount;
}

module.exports = account;