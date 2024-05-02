package eth

import (
	"fmt"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"math/big"
)

func AddLostItem(opts *bind.TransactOpts, lostItemName string, description string, lostDate *big.Int, location string, itemCategory string, reward *big.Int) error {
	// 调用合约的 AddLostItem 方法
	tx, err := Ins.AddLostItem(opts, lostItemName, description, lostDate, location, itemCategory, reward)
	if err != nil {
		return err // 返回错误
	}

	fmt.Println("交易哈希:", tx.Hash().Hex())
	return nil

}
