package firebase

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go/v4"

	"google.golang.org/api/option"
)

func ServiceAccount()(*firebase.App,error) {

	opt := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}
	// client,err:= app.Auth(context.Background())
	// client.VerifyIDToken()

	return app, nil
}
