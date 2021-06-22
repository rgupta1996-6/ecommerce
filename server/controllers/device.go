package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

//Create a new category........
func CreateDeviceType(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	fmt.Println("Data------->", data)
	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/device/types"

	jsonValue, _ := json.Marshal(data)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	status := resp.Status
	fmt.Println("response Body:", string(body))
	return c.JSON(status)
}

func CreateDevice(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id := c.Params("id")

	fmt.Println("Data------->", data)
	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/device/types/" + id + "/devices"

	jsonValue, _ := json.Marshal(data)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	status := resp.Status
	fmt.Println("response Body:", string(body))
	return c.JSON(status)
}

func ListDeviceTypes(c *fiber.Ctx) error {

	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/device/types"

	resp, err := http.Get(url)
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	// status := resp.Status
	fmt.Println("Response:", resp)
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println("response Body:", string(body))
	res := string(body)
	return c.JSON(res)

}

func ListDevices(c *fiber.Ctx) error {

	id := c.Params("id")

	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/device/types/" + id + "/devices"

	resp, err := http.Get(url)
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	// status := resp.Status
	fmt.Println("Response:", resp)
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println("response Body:", string(body))
	res := string(body)
	return c.JSON(res)

}

//Create a new destination........
func CreateDestination(c *fiber.Ctx) error {

	// var data map[string]string
	// if err := c.Body(&data); err != nil {
	// 	return err
	// }

	//fmt.Println("Data------->", data)
	id := c.Params("id")
	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/historianconnectors/" + id + "/destinations"

	req := c.Body()

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	status := resp.Status
	fmt.Println("response Body:", string(body))
	return c.JSON(status)
}

func ListDestinations(c *fiber.Ctx) error {

	id := c.Params("id")

	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/historianconnectors/" + id + "/destinations"

	resp, err := http.Get(url)
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	// status := resp.Status
	fmt.Println("Response:", resp)
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println("response Body:", string(body))
	res := string(body)
	return c.JSON(res)

}

func CreateForwardRule(c *fiber.Ctx) error {

	// var data map[string]string
	// if err := c.Body(&data); err != nil {
	// 	return err
	// }

	//fmt.Println("Data------->", data)
	id := c.Params("id")
	url := "https://a-bj691i-8n6vhcnyjf:-I_q)V7JClGB2+lxFo@bj691i.internetofthings.ibmcloud.com/api/v0002/historianconnectors/" + id + "/forwardingrules"

	req := c.Body()

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(req))
	if err != nil {

		fmt.Errorf("error: %v", err)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err,
		})
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)

	status := resp.Status
	fmt.Println("response Body:", string(body))
	return c.JSON(status)
}
