import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Box,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function NotificationCard({
  notification,
  onOpen,
  onDelete,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: ".2s",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <ShoppingCartIcon color="primary" />

              <Typography
                fontWeight="bold"
              >
                New Order
              </Typography>

              {notification.isNew && (
                <Chip
                  size="small"
                  color="error"
                  label="NEW"
                />
              )}
            </Stack>

            <Typography>
              {notification.customer?.name}
            </Typography>

            <Typography
              color="text.secondary"
              variant="body2"
            >
              {notification.customer?.email}
            </Typography>

            <Typography
              fontWeight="bold"
            >
              ₦
              {Number(
                notification.total || 0
              ).toLocaleString()}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {notification.items?.length || 0} items
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Order #
              {notification.id.slice(0, 8)}
            </Typography>
          </Stack>

          <Box>
            <Button
              variant="contained"
              onClick={() =>
                onOpen(notification)
              }
            >
              Open
            </Button>

            <Button
              color="error"
              variant="outlined"
              onClick={() => onDelete(notification)}
            >
              Hide
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}