#!/bin/bash

# Setup script for new component
COMPONENT_NAME=${1:-my-component}

echo "Setting up component: $COMPONENT_NAME"

# Update component.json
sed -i "s/component-name/$COMPONENT_NAME/g" component.json

# Update package.json
sed -i "s/\"component\"/\"$COMPONENT_NAME\"/g" frontend/package.json

# Install foundry dependencies
cd contracts
forge install foundry-rs/forge-std --no-commit

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  cd frontend && npm install"
echo "  npm run dev"
